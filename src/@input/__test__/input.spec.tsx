import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@input/index';

describe('Input', () => {
  it('renders with default placeholder', () => {
    render(<Input />);
    const input = screen.getByPlaceholderText('Type something...');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<Input />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Kelvyn' } });
    expect(input.value).toBe('Kelvyn');
  });
});
