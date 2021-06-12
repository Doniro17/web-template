import { render, fireEvent } from 'test-utils';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  it('renders correctly', () => {
    const { container } = render(<LoginForm />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Handle Login change correctly', () => {
    const { getByPlaceholderText } = render(<LoginForm />);
    const input = getByPlaceholderText('email');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });
  it('Handle Password change correctly', () => {
    const { getByPlaceholderText } = render(<LoginForm />);
    const input = getByPlaceholderText('password');
    fireEvent.change(input, { target: { value: 'pass' } });
    expect(input.value).toBe('pass');
  });
});
