import Button from '../button'
import clsx from 'clsx'
import type { ComponentProps } from 'preact'

interface CardProps {
  mainText: string
  ctaText: string
  onCtaClick: NonNullable<ComponentProps<typeof Button>['onClick']>
  icon: NonNullable<ComponentProps<typeof Button>['iconLeft']>
  fill?: boolean
  class?: string
}

export default function Card(props: Readonly<CardProps>) {
  const {
    mainText,
    ctaText,
    onCtaClick,
    icon,
    fill = false,
    class: className,
  } = props

  return (
    <div
      class={clsx(
        'flex flex-wrap',
        'gap-(--res-mobile-spacing-lg) sm:gap-(--res-desktop-spacing-lg)',
        'bg-(--surface-colour-theme-primary) p-(--res-mobile-spacing-lg) sm:p-(--res-desktop-spacing-lg)',
        'rounded-(--border-radius-xl)',
        fill ? 'w-full' : 'w-fit',
        className,
      )}
    >
      <div
        class={clsx(
          'grow flex flex-col gap-8 justify-between',
          'gap-(--res-mobile-spacing-xl) sm:gap-(--res-desktop-spacing-md)',
        )}
      >
        <p
          class={clsx(
            '[font-size:var(--res-mobile-font-size-heading-h5)] font-(--font-font-weight-paragraph-medium)',
            'text-(--text-colour-action-inverse) max-w-30',
            'sm:[font-size:var(--res-desktop-font-size-heading-h5)]',
          )}
        >
          {mainText}
        </p>

        <Button iconLeft={icon} text={ctaText} onClick={onCtaClick} />
      </div>

      <CardGraphic />
    </div>
  )
}

function CardGraphic() {
  return (
    <svg
      class={clsx(
        'w-21 h-21.25',
        'shrink-0',
        'sm:w-36.25 sm:h-36.5',
        'outline-(length:--border-width-lg) outline-(--border-colour-primary) -outline-offset-(--border-width-lg)',
        'rounded-(--border-radius-md)',
      )}
      viewBox="0 0 145 146"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2183_4939)">
        <rect width="100%" height="100%" class="fill-(--surface-colour-page)" />
        <path
          d="M1.94922 72.8495H72.1168V143.761L1.94922 72.8495Z"
          class="fill-(--surface-colour-theme-primary)"
        />
        <path
          class={'stroke-(--border-colour-primary) stroke-[1.5]'}
          d="M1.94922 2.67896L72.1168 72.8495M142.284 143.761L72.1168 72.8495M72.1168 72.8495H1.94922L72.1168 143.761V72.8495Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_2183_4939">
          <rect width="100%" height="100%" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
