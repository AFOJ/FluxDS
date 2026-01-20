import { getIcon, type IconKey } from '../icons'
import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'preact/compat'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonState = 'default' | 'hover' | 'disabled'

interface ButtonProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'type' | 'className'
> {
  variant?: ButtonVariant
  iconLeft?: IconKey | null
  iconRight?: IconKey | null
  text: string
  fill?: boolean
}

export function Button(props: Readonly<ButtonProps>) {
  const {
    variant,
    iconLeft,
    iconRight,
    text,
    fill = false,
    class: className,
    ...rest
  } = props

  const resolvedVariant =
    VARIANT_CLASSES[variant ?? 'primary'] ?? VARIANT_CLASSES.primary

  const leftIconElement = getIcon(iconLeft)
  const rightIconElement = getIcon(iconRight)

  return (
    <button
      class={clsx(
        resolvedVariant.default,
        resolvedVariant.hover,
        resolvedVariant.disabled,
        fill ? `w-full` : 'w-fit',
        '[font-size:var(--res-mobile-font-size-action-md)] sm:[font-size:var(--res-desktop-font-size-action-md)] [font-weight:var(--font-font-weight-paragraph-medium)] font-[var(--font-font-family-paragraph)]',
        'cursor-pointer disabled:cursor-not-allowed',
        'transition-colors duration-200 ease-in-out box-border',
        'flex items-center justify-center gap-[var(--res-mobile-spacing-sm)]',
        'px-[var(--res-mobile-spacing-lg)] py-[var(--res-mobile-spacing-md)]  rounded-[var(--border-radius-round)]',
        'focus-visible:ring-2 focus-visible:ring-[var(--border-colour-primary)] focus-visible:outline-none',
        className,
      )}
      {...rest}
    >
      {leftIconElement && <span aria-hidden="true">{leftIconElement}</span>}
      <span class={"text-left"}>{text}</span>

      {rightIconElement && <span aria-hidden="true">{rightIconElement}</span>}
    </button>
  )
}

const VARIANT_CLASSES: Record<ButtonVariant, Record<ButtonState, string>> = {
  primary: {
    default:
      'bg-[var(--surface-colour-action-primary)] text-[var(--text-colour-action-onprimary)]',
    hover:
      'hover:bg-[var(--surface-colour-action-hover-primary)] hover:text-[var(--text-colour-action-inverse)]',
    disabled:
      'disabled:bg-[var(--surface-colour-disabled-dark)] disabled:text-[var(--text-colour-action-disabled)]',
  },
  secondary: {
    default:
      'bg-[var(--surface-colour-action-secondary)] text-[var(--text-colour-action-onsecondary)]',
    hover:
      'hover:bg-[var(--surface-colour-action-hover-secondary)] hover:text-[var(--text-colour-action-inverse)]',
    disabled:
      'disabled:bg-[var(--surface-colour-disabled-dark)] disabled:text-[var(--text-colour-action-disabled)]',
  },
  tertiary: {
    default:
      'bg-transparent border-solid [border-width:var(--border-width-md)] [border-color:var(--border-colour-primary)] text-[var(--text-colour-action-ontertiary)]',
    hover:
      'hover:bg-[var(--surface-colour-action-hover-primary)] hover:text-[var(--text-colour-action-inverse)]',
    disabled:
      'disabled:bg-transparent disabled:border-[var(--border-colour-disabled)]  disabled:text-[var(--text-colour-action-disabled)]',
  },
}
