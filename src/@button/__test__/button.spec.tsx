import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@button/index';

describe('Button component', () => {
  it('renders with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('base-btn', 'base-btn--default', 'base-btn--default');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('applies different variants', () => {
    render(<Button variant="destructive">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('base-btn--destructive');
  });

  it('applies different sizes', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('base-btn--lg');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('handles onClick', async () => {
    const handleClick = jest.fn(); // or jest.fn() if using Jest

    render(<Button onClick={handleClick}>Click</Button>);
    userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
