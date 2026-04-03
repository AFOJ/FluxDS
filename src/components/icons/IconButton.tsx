import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'preact/compat'
import { Icon, type IconKey } from '.'

interface IconButtonProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'aria-label' | 'type' | 'className'
> {
  icon: IconKey
  /**
   * Required for accessibility reasons.
   */
  ariaLabel: string
}
export function IconButton(props: IconButtonProps) {
  const { icon: iconKey, class: className, ariaLabel, ...rest } = props

  
  return (
    <button
      {...rest}
      type={'button'}
      class={clsx('disabled:cursor-not-allowed', className)}
      aria-label={ariaLabel}
    >
      <span aria-hidden="true"><Icon icon={iconKey} /></span>
    </button>
  )
}
