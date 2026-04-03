import Dropdown from './Dropdown'
import type { Meta, StoryObj } from '@storybook/preact'

const mockOptions = [
  { label: 'Retail Store Owner', value: 'retail' },
  { label: 'Convenience Store Owner', value: 'convenience' },
]

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the dropdown',
      table: {
        type: { summary: 'string' },
      },
    },

    options: {
      control: 'object',
      description: 'The options for the dropdown',
      table: {
        type: { summary: 'Array<{ label: string; value: string }>' },
      },
    },

    icon: {
      control: 'select',
      options: [null, 'clock', 'user'],
      description: 'Icon to display on the left side of the button'
    },

    value: {
      control: 'text',
      description: 'The current value of the dropdown',
    },

    required: {
      control: 'boolean',
      description: 'Whether the dropdown field is required.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    onChange: {
      description: 'Handles what happens when the dropdown value changes',
    },

    disabled: {
      control: 'boolean',
      description: 'Flag to disable the dropdown',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },

  decorators: [
    (Story) => {
      return <Story />
    },
  ],
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  args: {
    label: 'Default',
    required: true,
    options: [
      { label: 'Retail Store Owner', value: 'retail' },
      { label: 'Convenience Store Owner', value: 'convenience' },
    ],
  },
}

export const Prefilled: Story = {
  args: {
    label: 'Prefilled',
    value: 'convenience',
    options: mockOptions,
  },
}

export const Required: Story = {
  args: {
    label: 'Required',
    options: mockOptions,
    required: true,
    value: '',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Dropdown',
    disabled: true,
    options: mockOptions,
  },
}
