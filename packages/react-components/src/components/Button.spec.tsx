import { render } from '@testing-library/react';
import { Button } from './Button';

describe('index', () => {
  it('should render', () => {
    const buttonText = 'This is my text';
    const screen = render(
      <Button>
        <div>{buttonText}</div>
      </Button>,
    );
    expect(screen.findByText(buttonText)).toBeDefined();
  });
});
