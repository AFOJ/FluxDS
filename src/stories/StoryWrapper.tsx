import type { HTMLAttributes } from 'preact'

interface StoryWrapperProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'style'
> {
  theme?: string
}
export function StoryWrapper(props: Readonly<StoryWrapperProps>) {
  const { theme, children, ...rest } = props
  return (
    <div
      data-theme={theme ?? 'BrandA'}
      class="h-fit bg-[var(--surface-colour-page)] [font-family:var(--font-font-family-paragraph)]"
      {...rest}
    >
      {children}
    </div>
  )
}
