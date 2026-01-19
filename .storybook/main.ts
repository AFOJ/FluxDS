import type { StorybookConfig } from '@storybook/preact-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials','@storybook/addon-a11y'],
  framework: '@storybook/preact-vite',
} 
export default config
