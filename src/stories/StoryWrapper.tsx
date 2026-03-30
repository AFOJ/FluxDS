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
      data-theme={theme?.toLowerCase() ?? 'booker'}
      class="h-fit bg-white [font-family:var(--font-font-family-paragraph)]"
      {...rest}
    >
      {children}
    </div>
  )
}
