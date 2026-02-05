import fs from 'fs'

const figmaTokens = JSON.parse(
  fs.readFileSync('./scripts/figma-tokens.json', 'utf8'),
)

const FONT_WEIGHT_MAP = {
  thin: '100',
  'extra light': '200',
  light: '300',
  regular: '400',
  medium: '500',
  'semi bold': '600',
  semibold: '600',
  bold: '700',
  'extra bold': '800',
  black: '900',
}

const FONT_FAMILY_MAP = {
  inter: '"Inter", system-ui, sans-serif',
  'open sans': '"Open Sans", sans-serif',
  'mencken-std-head-narrow': '"mencken-std-head-narrow", serif',
}

/**
 * Resolves token references like "{Scale.X}" by looking them up in the token tree.
 * Recursively follows references until a concrete value is found.
 */
function resolveTokenValue(tokenValue, brandContext) {
  if (typeof tokenValue !== 'string' || !tokenValue.startsWith('{')) {
    return tokenValue
  }

  const cleanPath = tokenValue.replace(/[{}]/g, '')
  const pathSegments = cleanPath.split('.')

  // Possible locations where the token might be defined
  const searchRoots = [
    figmaTokens[`Mapped/${brandContext}`], // Unfortunately needed for just {Surface.Colour.Accent} :(
    figmaTokens[`Alias colours/${brandContext}`],
    figmaTokens['Primitives/Default'],
  ]

  for (const root of searchRoots) {
    let current = root

    for (const segment of pathSegments) {
      if (!current?.[segment]) {
        current = null
        break
      }
      current = current[segment]
    }

    // If we've found a value, recursively resolve it (in case it's also a reference)
    if (current?.value !== undefined) {
      return resolveTokenValue(current.value, brandContext)
    }
  }

  return tokenValue
}

/**
 * Recursively processes a category of tokens and generates CSS custom property declarations.
 *
 * @param {Object} categoryObj -The object in the token tree we are processing (e.g., Surface, Text).
 * @param {string} prefix - The CSS custom property prefix (e.g., --surface).
 * @param {string} brand - The current brand context for resolving references.
 * @param {string[]} cssLines - The array to which generated CSS lines are appended.
 */
function processTokenCategory(categoryObj, prefix, brand, cssLines) {
  for (const [tokenName, token] of Object.entries(categoryObj)) {
    if (tokenName.includes('↘︎')) {
      continue
    }

    // Build the CSS custom property name (e.g., --surface-colour)
    const cssPropertyName = `${prefix}-${tokenName.toLowerCase().replace(/\s+/g, '-')}`

    const isLeafToken = token.value !== undefined

    if (!isLeafToken) {
      processTokenCategory(token, cssPropertyName, brand, cssLines)
      continue
    }

    // If this token has a direct value, process it
    let resolvedValue = resolveTokenValue(token.value, brand)

    if (cssPropertyName.includes('weight')) {
      const lookupKey = String(resolvedValue).toLowerCase().trim()
      resolvedValue = FONT_WEIGHT_MAP[lookupKey] || resolvedValue
    }

    if (cssPropertyName.includes('font-family')) {
      const lookupKey = String(resolvedValue).toLowerCase().trim()
      resolvedValue =
        FONT_FAMILY_MAP[lookupKey] || `"${resolvedValue}", sans-serif`
    }

    // Add 'px' suffix to numeric values (except for weights and line-heights)
    const isNumeric =
      token.type === 'number' ||
      (!isNaN(resolvedValue) && typeof resolvedValue !== 'boolean')
    const needsPixelSuffix =
      !cssPropertyName.includes('weight') &&
      !cssPropertyName.includes('line-height')

    if (isNumeric && needsPixelSuffix) {
      resolvedValue = `${resolvedValue}px`
    }

    const INDENTATION = '    '
    cssLines.push(`${INDENTATION}${cssPropertyName}: ${resolvedValue};`)
  }
}

function getBrandCategories(brand) {
  return Object.keys(figmaTokens[`Mapped/${brand}`])
}

function generateResponsiveTokensCSS() {
  const BRAND = 'NOT-IMPORTANT'
  let cssContent = '/* Responsive Tokens */\n:root {\n'
  const cssLines = []

  if (figmaTokens['Responsive/Desktop']) {
    processTokenCategory(
      figmaTokens['Responsive/Desktop'],
      '--res-desktop',
      BRAND,
      cssLines,
    )
  }

  if (figmaTokens['Responsive/Mobile']) {
    processTokenCategory(
      figmaTokens['Responsive/Mobile'],
      '--res-mobile',
      BRAND,
      cssLines,
    )
  }

  cssContent += cssLines.join('\n')
  cssContent += `\n}`
  return cssContent
}

/**
 * Generates all CSS custom properties for a specific brand.
 */
function generateBrandCSS(brand) {
  const cssLines = []
  const categories = getBrandCategories(brand)

  // Process each design token category
  categories.forEach((category) => {
    const brandCategory = figmaTokens[`Mapped/${brand}`]?.[category]
    if (brandCategory) {
      processTokenCategory(
        brandCategory,
        `--${category.toLowerCase()}`,
        brand,
        cssLines,
      )
    }
  })

  return cssLines.join('\n')
}

function getBrandKeys() {
  const searchKey = 'Mapped/'
  return figmaTokens['$metadata']?.['tokenSetOrder']
    .filter((key) => key.startsWith(searchKey))
    .map((key) => key.replace(searchKey, ''))
}

const brands = getBrandKeys()
const GLOBAL_CSS_PATH = 'src/global.css'
let cssContent = `/* To use, copy the content of this into ${GLOBAL_CSS_PATH} */\n\n`

brands.forEach((brand, index) => {
  const isFirstBrand = index === 0

  // First brand shares selector with :root for default theme
  // This way I don't need a context switcher for handling default brand
  const selector = isFirstBrand
    ? `:root, [data-theme="${brand}"]`
    : `[data-theme="${brand}"]`

  cssContent += `${selector} {\n`
  cssContent += generateBrandCSS(brand)
  cssContent += '\n}\n'
})

cssContent += `\n${generateResponsiveTokensCSS()}\n`

fs.writeFileSync('./scripts/tokens.css', cssContent)
console.log('Tokens extracted to scripts/tokens.css')
