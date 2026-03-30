import type { Preview } from '@storybook/preact-vite'
import { StoryWrapper } from '../src/stories/StoryWrapper'
import '../src/global.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Switch Global Theme',
      defaultValue: 'Booker',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['Booker', 'Venus'],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story: any, context: any) => (
      <StoryWrapper theme={context.globals.theme}>
        <Story />
      </StoryWrapper>
    ),
  ],
}

export default preview
