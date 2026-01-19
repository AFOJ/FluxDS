import clsx from 'clsx'
import { Button } from '../button/Button'
import type { ComponentProps } from 'preact'

interface CardProps {
  mainText: string
  ctaText: string
  onCtaClick: NonNullable<ComponentProps<typeof Button>['onClick']>
  icon: NonNullable<ComponentProps<typeof Button>['iconLeft']>
  fill?: boolean
  class?: string
}

export function Card(props: Readonly<CardProps>) {
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
        'gap-[var(--res-mobile-spacing-lg)] sm:gap-[var(--res-desktop-spacing-lg)]',
        'bg-[var(--surface-colour-brand-primary)] p-[var(--res-mobile-spacing-lg)] sm:p-[var(--res-desktop-spacing-lg)] rounded-[var(--border-radius-xl)]',
        fill ? 'w-full' : 'w-fit',
        className,
      )}
    >
      <div
        class={clsx(
          'flex-grow flex flex-col gap-[32px] justify-between',
          'gap-[var(--res-mobile-spacing-xl)] sm:gap-[var(--res-desktop-spacing-md)]',
        )}
      >
        <p
          class={clsx(
            '[font-size:var(--res-mobile-font-size-heading-h5)] [font-weight:var(--font-font-weight-paragraph-medium)]',
            'text-[var(--text-colour-action-inverse)] max-w-[120px]',
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
        'w-[84px] h-[85px]',
        'flex-shrink-0',
        'sm:w-[145px] sm:h-[146px]',
      )}
      viewBox="0 0 84 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_13011_205)">
        <mask id="path-1-inside-1_13011_205" fill="white">
          <path d="M0 8C0 3.58172 3.58172 0 8 0H76C80.4183 0 84 3.58172 84 8V77C84 81.4183 80.4183 85 76 85H8C3.58172 85 0 81.4183 0 77V8Z" />
        </mask>
        <path
          d="M0 8C0 3.58172 3.58172 0 8 0H76C80.4183 0 84 3.58172 84 8V77C84 81.4183 80.4183 85 76 85H8C3.58172 85 0 81.4183 0 77V8Z"
          class="fill-[var(--surface-colour-page)]"
        />
        <path
          d="M1.13379 42.4123H41.9478V83.6961L1.13379 42.4123Z"
          class="fill-[var(--surface-colour-brand-primary)]"
        />
        <path
          d="M1.13379 1.55957L41.9478 42.4123M82.7618 83.6961L41.9478 42.4123M41.9478 42.4123H1.13379L41.9478 83.6961V42.4123Z"
          class="stroke-[var(--border-colour-primary)]"
          stroke-width="1.5"
        />
      </g>
      <path
        d="M8 0V1.5H76V0V-1.5H8V0ZM84 8H82.5V77H84H85.5V8H84ZM76 85V83.5H8V85V86.5H76V85ZM0 77H1.5V8H0H-1.5V77H0ZM8 85V83.5C4.41015 83.5 1.5 80.5899 1.5 77H0H-1.5C-1.5 82.2467 2.75329 86.5 8 86.5V85ZM84 77H82.5C82.5 80.5899 79.5899 83.5 76 83.5V85V86.5C81.2467 86.5 85.5 82.2467 85.5 77H84ZM76 0V1.5C79.5899 1.5 82.5 4.41015 82.5 8H84H85.5C85.5 2.7533 81.2467 -1.5 76 -1.5V0ZM8 0V-1.5C2.7533 -1.5 -1.5 2.75329 -1.5 8H0H1.5C1.5 4.41015 4.41015 1.5 8 1.5V0Z"
        fill="black"
        mask="url(#path-1-inside-1_13011_205)"
      />
      <defs>
        <clipPath id="clip0_13011_205">
          <path
            d="M0 8C0 3.58172 3.58172 0 8 0H76C80.4183 0 84 3.58172 84 8V77C84 81.4183 80.4183 85 76 85H8C3.58172 85 0 81.4183 0 77V8Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
