import { render, screen } from '@testing-library/react';
import { Label } from '@label/index';

describe('Label component', () => {
  it('should renders content correctly', () => {
    render(<Label content="Autocomplete" />);
    const label = screen.getByText('Autocomplete');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('should renders with children correctly', () => {
    render(
      <Label>
        <span>Child Content</span>
      </Label>,
    );
    const label = screen.getByText('Child Content');
    expect(label).toBeInTheDocument();
  });

  it('should applies correct size class', () => {
    render(<Label content="Sized Label" size="large" />);
    const label = screen.getByText('Sized Label');
    expect(label).toHaveClass('base-label', 'base-label--large');
  });

  it('should applies additional props like htmlFor and className', () => {
    render(<Label content="Linked Label" htmlFor="input-id" className="custom-class" />);
    const label = screen.getByText('Linked Label');
    expect(label).toHaveAttribute('for', 'input-id');
    expect(label).toHaveClass('custom-class');
  });
});
