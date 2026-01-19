import type { Meta, StoryObj } from '@storybook/preact'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'The visual style of the button',
    },
    iconLeft: {
      control: 'select',
      options: [
        null,
        'chevron-left',
        'chevron-right',
        'chevron-down',
        'chevron-up',
        'user',
        `close`,
        `clock`,
        `tick`,
      ],
      description: 'Icon to display on the left side of the button',
      table: {
        type: { summary: 'string' },
      },
    },
    iconRight: {
      control: 'select',
      options: [
        null,
        'chevron-left',
        'chevron-right',
        'chevron-down',
        'chevron-up',
        'user',
        `close`,
        `clock`,
        `tick`,
      ],
      description: 'Icon to display on the right side of the button',
      table: {
        type: { summary: 'string' },
      },
    },
    text: {
      control: 'text',
      description: 'The text to display inside the button',
    },
    fill: {
      control: 'boolean',
      description:
        'Whether the button should take the full width of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Flag to disable the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    text: 'Primary Button',
    iconRight: 'chevron-right',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    text: 'Secondary Button',
    iconLeft: 'user',
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary Button',
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    text: 'Full Width Button',
    fill: true,
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    text: 'Disabled Button',
    disabled: true,
  },
}
