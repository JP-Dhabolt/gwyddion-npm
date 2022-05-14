import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '@gwyddion/react-components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Gwyddion/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      defaultValue: 'My Button',
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Basic: ComponentStory<typeof Button> = args => <Button>{args.children}</Button>;
