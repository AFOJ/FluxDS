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
      style={{ padding: '40px', height: 'fit-content', background: 'var(--surface-colour-page)' }}
      {...rest}
    >
      {children}
    </div>
  )
}
