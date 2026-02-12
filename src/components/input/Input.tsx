import { clsx } from 'clsx'
import { IconButton, TickIcon } from '../icons'
import { useEffect, useState } from 'preact/hooks'
import type { ComponentPropsWithoutRef } from 'preact/compat'
import type { TargetedInputEvent, TargetedMouseEvent } from 'preact'

interface InputFieldProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'onBlur' | 'onFocus' | 'type'
> {
  label: string
  error?: boolean
  success?: boolean
  disabled?: boolean
  required?: boolean
  type?: 'text' | 'email'
  value?: string
  clearable?: boolean
  fill?: boolean
}

export function Input(props: Readonly<InputFieldProps>) {
  const {
    label,
    error,
    success,
    disabled,
    required,
    clearable,
    onInput,
    value,
    type = 'text',
    fill,
    ...rest
  } = props
  const [isFocused, setIsFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(value || '')
  const hasValue = internalValue.length > 0

  useEffect(() => {
    setInternalValue(value || '')
  }, [value])

  const handleInput = (e: TargetedInputEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement)?.value
    setInternalValue(newValue || '')

    if (onInput) {
      onInput(e)
    }
  }

  const handleClear = (e: TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setInternalValue('')
  }

  const isFloating = isFocused || hasValue
  const state = disabled ? 'disabled' : error ? 'error' : 'default'

  const labelStyles = {
    default: isFloating
      ? 'text-[var(--text-colour-body)]'
      : 'text-[var(--text-colour-passive)]',
    error: 'text-[var(--text-colour-error)]',
    disabled: 'text-[var(--text-colour-disabled)]',
  }

  return (
    <div class={clsx(fill ? 'w-full' : 'w-fit', 'space-y-1')}>
      <div
        class={clsx(
          'relative flex items-center space-x-2',
          'transition-all duration-200',
          'ring-inset rounded-[var(--border-radius-md)]',
          {
            'ring-[length:0px]': disabled,
            'ring-[length:var(--border-width-lg)]':
              isFocused || (hasValue && !disabled),
            'ring-[length:var(--border-width-xs)]':
              !isFocused && !hasValue && !disabled,

            'ring-[var(--border-colour-error)]': error && !disabled,
            'ring-[var(--border-colour-passive)]': !error && !disabled,
          },
          {
            'bg-[var(--surface-colour-disabled-dark)] cursor-not-allowed':
              disabled,
            'bg-[var(--surface-colour-page)]': hasValue && !disabled,
            'bg-[var(--surface-colour-secondary)]': !hasValue && !disabled,
          },
        )}
      >
        <label
          htmlFor={props.id}
          class={clsx(
            'absolute  transition-all duration-200 pointer-events-none',
            isFloating
              ? '-top-2 left-3 text-[10px] font-medium px-1'
              : 'top-1/2 left-3 -translate-y-1/2 text-sm',
            labelStyles[state],
            {
              // Below is purely for the background handling.
              'bg-white': isFloating && !disabled && !hasValue,
              'bg-gradient-to-b from-white from-50% to-[var(--surface-colour-page)] to-50%':
                isFloating && !disabled && hasValue,
              'bg-transparent text-[var(--text-colour-disabled)]':
                isFloating && disabled,
            },
          )}
        >
          {label}
        </label>

        <input
          {...rest}
          type={type}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={'off'}
          onInput={handleInput}
          value={internalValue}
          class={clsx(
            'w-full outline-none p-3 disabled:cursor-not-allowed',
            '[font-size:var(--res-mobile-font-size-body-md)] disabled:text-[var(--text-colour-disabled)]',
            {
              'text-[var(--text-colour-error)]': error && !disabled,
            },
            'bg-transparent text-[var(--text-colour-active)]',
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-required={required ? 'true' : undefined}
          aria-disabled={disabled ? 'true' : undefined}
        />

        {((success && !error) || clearable) && (
          <div class="flex items-center pr-3">
            {success && !error ? (
              <span
                aria-hidden="true"
                class={'text-[var(--text-colour-success)]'}
              >
                <TickIcon />
              </span>
            ) : (
              clearable && (
                <IconButton
                  icon={'close'}
                  onClick={handleClear}
                  disabled={disabled}
                  ariaLabel="close-input-button"
                  class={clsx({
                    'text-[var(--text-colour-disabled)]': disabled,
                    'text-[var(--text-colour-error)]': error && !disabled,
                    'text-[var(--text-colour-action-active)]':
                      !disabled && !error,
                  })}
                />
              )
            )}
          </div>
        )}
      </div>

      {required && (
        <p class="[font-size:var(--res-mobile-font-size-body-xs)] text-[var(--text-colour-disabled)]  ">
          <span class="text-[var(--text-colour-warning)] ">*</span>required
        </p>
      )}
    </div>
  )
}
