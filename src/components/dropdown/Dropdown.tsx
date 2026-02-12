import { ChevronDownIcon, getIcon, type IconKey } from '../icons'
import { useEffect, useRef, useState } from 'preact/hooks'
import clsx from 'clsx'

interface Option {
  label: string
  value: string
}

interface DropdownProps {
  label: string
  options: Option[]
  icon?: IconKey
  value?: string
  disabled?: boolean
  required?: boolean
  onChange?: (value: string) => void
  class?: string
}

export function Dropdown(props: Readonly<DropdownProps>) {
  const {
    label,
    options,
    icon,
    value,
    disabled,
    required,
    class: className,
    onChange,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const [selectedValue, setSelectedValue] = useState(value || '')

  const selectedOption = options.find((opt) => opt.value === selectedValue)
  const hasValue = !!selectedValue
  const isFloating = isFocused || isOpen || hasValue

  const handleToggle = () => !disabled && setIsOpen(!isOpen)

  const handleSelect = (val: string) => {
    setSelectedValue(val)
    setIsOpen(false)
    onChange?.(val)
  }

  useEffect(() => {
    if (isOpen && activeIndex >= 0 && listRef.current) {
      const activeElement = listRef.current.children[activeIndex] as HTMLElement
      if (activeElement) {
        activeElement.scrollIntoView({
          block: 'nearest',
        })
      }
    }
  }, [activeIndex, isOpen])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) setIsOpen(true)
        setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!isOpen) setIsOpen(true)
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (isOpen && activeIndex >= 0) {
          handleSelect(options[activeIndex].value)
        } else {
          setIsOpen(true)
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'Tab':
        setIsOpen(false)
        break
    }
  }

  const leftIconElement = getIcon(icon)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      class={clsx('w-full relative flex flex-col', className)}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        class={clsx(
          'relative w-full flex items-center p-4 justify-between transition-all duration-200  min-h-[--res-mobile-spacing-5xl]',
          'rounded-[var(--border-radius-md)] border-none outline-none',
          {
            'ring-inset  ring-[var(--border-colour-passive)]': !disabled,
            'ring-[length:var(--border-width-lg)]': hasValue && !disabled,
            'ring-[length:var(--border-width-md)]':
              isFocused && !hasValue && !disabled,
            'ring-[length:var(--border-width-xs)]':
              !isFocused && !hasValue && !disabled,
          },
          {
            'bg-[var(--surface-colour-disabled-dark)] cursor-not-allowed':
              disabled,
            'bg-[var(--surface-colour-page)]': hasValue && !disabled,
            'bg-[var(--surface-colour-secondary)]': !hasValue && !disabled,
          },
        )}
      >
        <div class="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
          <label
            class={clsx(
              'absolute transition-all duration-200 pointer-events-none px-1',
              {
                '-top-2 left-3 [font-size:var(--res-mobile-font-size-body-xs)] [font-weight:var(--font-font-weight-paragraph-regular)]':
                  isFloating,
                'top-1/2 -translate-y-1/2 [font-size:var(--res-mobile-font-size-body-md)] [font-weight:var(--font-font-weight-paragraph-medium)] text-[var(--text-colour-passive)]':
                  !isFloating,
                'left-9': !isFloating && icon,
                'left-2': !isFloating && !icon,
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

          {leftIconElement && (
            <span
              aria-hidden="true"
              class={clsx({
                'text-[var(--text-colour-disabled)]': disabled,
                'text-[var(--text-colour-action-active)]': !disabled,
              })}
            >
              {leftIconElement}
            </span>
          )}

          <span
            class={clsx(
              '[font-weight:var(--font-font-weight-paragraph-medium)]',
              'truncate',
              {
                'text-[var(--text-colour-disabled)]': disabled,
                'text-[var(--text-colour-active)]': !disabled,
              },
            )}
          >
            {selectedOption?.label || ''}
          </span>
        </div>

        <span
          aria-hidden="true"
          className={clsx('transition-transform duration-200', {
            'rotate-180': isFocused || isOpen,
            'text-[var(--text-colour-disabled)]': disabled,
            'text-[var(--text-colour-active)]': !disabled,
          })}
        >
          <ChevronDownIcon />
        </span>
      </button>

      <div class="relative w-full h-0">
        {isOpen && (
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            class={clsx(
              'absolute z-50 overflow-auto',
              'w-full mt-1',
              'max-h-64',
              'bg-[var(--surface-colour-secondary)]',
              'border-none rounded-[var(--border-radius-md)]  shadow-2xl shadow-black/20 ',
              'focus:outline-none',
              '[&::-webkit-scrollbar]:w-3',
              '[&::-webkit-scrollbar-thumb]:border-[4px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent',
              '[&::-webkit-scrollbar-thumb]:bg-clip-padding',
              '[&::-webkit-scrollbar-thumb]:rounded-full',
              '[&::-webkit-scrollbar-thumb]:bg-[var(--surface-colour-disabled-dark)]',
              'hover:[&::-webkit-scrollbar-thumb]:bg-[var(--surface-colour-action-hover-primary)]',
              '[&::-webkit-scrollbar-track]:bg-transparent',
            )}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={selectedValue === option.value}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setActiveIndex(index)}
                class={clsx(
                  'cursor-pointer select-none p-3 [font-size:var(--res-mobile-font-size-body-sm)] transition-colors truncate',
                  'min-w-0',
                  {
                    'bg-[var(--surface-colour-passive)]': activeIndex === index,
                    'text-[var(--text-colour-active)] [font-weight:var(--font-font-weight-paragraph-bold)]':
                      selectedValue === option.value,
                  },
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {required && (
        <p class="[font-size:var(--res-mobile-font-size-body-xs)] text-[var(--text-colour-disabled)] font-light">
          <span class="text-[var(--text-colour-warning)]">*</span>required
        </p>
      )}
    </div>
  )
}
