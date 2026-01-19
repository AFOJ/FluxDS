import { Button } from '../button/Button'
import { Card } from '../card/Card'
import { Dropdown } from '../dropdown/Dropdown'
import { IconButton } from '../icons'
import { Input } from '../input/Input'
import { useRef, useEffect } from 'preact/hooks'
import clsx from 'clsx'

interface LoginDrawerProps {
  onClose?: () => void
  isOpen?: boolean
}
export function LoginDrawer(props: Readonly<LoginDrawerProps>) {
  const { onClose, isOpen = false } = props

  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !drawerRef.current) {
      return
    }

    const container = drawerRef.current

    const focusableSelectors = 'button, input, [tabindex]:not([tabindex="-1"])'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' && e.key !== 'Escape') return

      if (e.key === 'Escape') {
        onClose?.()
        return
      }

      const focusableElements =
        container.querySelectorAll<HTMLElement>(focusableSelectors)
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const isFirstElementFocused = document.activeElement === firstElement
      const isLastElementFocused = document.activeElement === lastElement

      if (e.shiftKey) {
        if (isFirstElementFocused) {
          lastElement.focus()
          e.preventDefault()
        }
      } else if (isLastElementFocused) {
        firstElement.focus()
        e.preventDefault()
      }
    }

    // Focus the first element or the close button when opened
    const initialFocus =
      container.querySelector<HTMLElement>(focusableSelectors)
    initialFocus?.focus()

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-drawer-title"
      class={clsx(
        'w-full max-w-[500px] bg-[var(--surface-colour-secondary)]',
        'flex flex-col gap-[var(--res-mobile-spacing-3xl)] sm:gap-[var(--res-desktop-spacing-2xl)]',
        'p-[var(--res-mobile-spacing-2xl)] sm:p-[var(--res-desktop-spacing-2xl)]',
      )}
    >
      <div class={'w-full flex justify-end'}>
        <IconButton
          ariaLabel="Close Button"
          icon="close"
          onClick={onClose}
          class={clsx({ 'cursor-pointer': Boolean(onClose) })}
        />
      </div>

      <h2
        id="login-drawer-title"
        class={clsx(
          'text-[var(--text-colour-brand)]',
          '[font-size:var(--res-mobile-font-size-heading-h4)] sm:[font-size:var(--res-desktop-font-size-heading-h4)] ',
          '[font-weight:var(--font-font-weight-header-medium)]',
          'sm:max-w-[300px]',
        )}
      >
        Log into your account
      </h2>

      <p>Please enter your email for a one-time-only code</p>

      <form
        class={
          'space-y-[var(--res-mobile-spacing-2xl)] sm:space-y-[var(--res-desktop-spacing-xl)]'
        }
      >
        <Dropdown
          label="Customer Type"
          options={[
            { label: 'Customer 1', value: 'cust-1' },
            { label: 'Customer 2', value: 'cust-2' },
          ]}
        />

        <Input id={'email-input'} label="Email" type="email" fill />
      </form>

      <div
        class={
          'w-full flex flex-col gap-[var(--res-mobile-spacing-md)] sm:gap-[var(--res-desktop-spacing-md)]'
        }
      >
        <Button text="Continue" variant="secondary" fill />
        <Button text="Login with your password" variant="tertiary" fill />
      </div>

      <Card
        mainText="Join the family."
        ctaText="Become a member"
        onCtaClick={() => {}}
        icon="user"
        fill
      />
    </div>
  )
}
