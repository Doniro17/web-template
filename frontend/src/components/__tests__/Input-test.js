import { render } from 'test-utils';
import Input from '../Input';

const testValue = '';
const props = {
  label: 'Client',
  labelStyle: 'labelStyle',
  type: 'checkbox',
  value: testValue,
  onChange: jest.fn(),
  className: 'testClass',
  name: 'testName',
};

describe('Input', () => {
  it('renders correctly', () => {
    const { container } = render(<Input {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
