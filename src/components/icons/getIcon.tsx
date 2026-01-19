import { ChevronLeftIcon } from './ChevronLeftIcon'
import { ChevronRightIcon } from './ChevronRightIcon'
import { ClockIcon } from './ClockIcon'
import { CloseIcon } from './CloseIcon'
import { TickIcon } from './TickIcon'
import { UserIcon } from './UserIcon'
import { ChevronDownIcon } from './ChevronDownIcon'
import { ChevronUpIcon } from './ChevronUpIcon'

export type IconKey =
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'chevron-up'
  | 'user'
  | 'close'
  | 'clock'
  | 'tick'

  /**
   * Returns the corresponding icon component based on the provided icon name.
   * @param iconName - The key representing the desired icon.
   */

  // iconName is value optional only so it isn't called like getIcon('') accidentally
export function getIcon(iconName: IconKey | null | undefined) {
  switch (iconName) {
    case 'chevron-left':
      return <ChevronLeftIcon />
    case 'chevron-right':
      return <ChevronRightIcon />
    case 'user':
      return <UserIcon />
    case 'close':
      return <CloseIcon />
    case 'clock':
      return <ClockIcon />
    case 'tick':
      return <TickIcon />
    case 'chevron-down':
      return <ChevronDownIcon />
    case 'chevron-up':
      return <ChevronUpIcon />
    default:
      return null
  }
}
