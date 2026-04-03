import { ChevronLeftIcon } from './ChevronLeftIcon'
import { ChevronRightIcon } from './ChevronRightIcon'
import { ClockIcon } from './ClockIcon'
import { CloseIcon } from './CloseIcon'
import { TickIcon } from './TickIcon'
import { UserIcon } from './UserIcon'
import { ChevronDownIcon } from './ChevronDownIcon'
import { ChevronUpIcon } from './ChevronUpIcon'
import type { JSX } from 'preact/jsx-runtime'

export type IconKey =
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'chevron-up'
  | 'user'
  | 'close'
  | 'clock'
  | 'tick'


const iconMap: Record<IconKey, () => JSX.Element> = {
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-up': ChevronUpIcon,
  user: UserIcon,
  close: CloseIcon,
  clock: ClockIcon,
  tick: TickIcon,
}

export function Icon(props: Readonly<{ icon: IconKey }>): JSX.Element {
  const { icon } = props

  const IconComponent = iconMap[icon]

  return <IconComponent />
}
