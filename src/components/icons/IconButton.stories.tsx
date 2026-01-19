import type { Meta, StoryObj } from '@storybook/preact'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: [
        'chevron-left',
        'chevron-right',
        'chevron-down',
        'chevron-up',
        'user',
        'close',
        'clock',
        'tick',
      ],
      description: 'The key of the icon to display from the icon library',
    },
    ariaLabel: {
      control: 'text',
      description: 'Critical for screen readers as the button has no text',
    },
    onClick: { action: 'clicked' },
    class: {
      control: 'text',
      description: 'Additional classes to apply to the button',
    },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Regular: Story = {
  args: {
    icon: 'user',
    ariaLabel: 'User Profile',
  },
}

export const Inaccessible: Story = {
  args: {
    icon: 'user',
    ariaLabel: '',
  },
}

export const CustomDisabled: Story = {
  args: {
    icon: 'clock',
    ariaLabel: 'Clock Button',
    disabled: true,
    class: 'disabled:text-red-500 text-green-500',
  },
}
