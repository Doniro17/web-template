import { render, fireEvent } from 'test-utils';

import RegistrationForm from '../RegistrationForm';

describe('LoginForm', () => {
  it('renders correctly', () => {
    const { container } = render(<RegistrationForm />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Test checkbox status', () => {
    const { getByLabelText } = render(<RegistrationForm />);
    const checkbox = getByLabelText('Client');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
  it('Handle Login input correctly', () => {
    const { getByPlaceholderText } = render(<RegistrationForm />);
    const input = getByPlaceholderText('login');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });
});
