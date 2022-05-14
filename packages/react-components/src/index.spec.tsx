import { render } from '@testing-library/react';
import { Button } from '.';

describe('index', () => {
  it('should render', () => {
    const screen = render(<Button />);
    expect(screen.findByText('Click Me!')).toBeDefined();
  });
});
