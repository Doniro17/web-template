import { render, fireEvent } from 'test-utils';

import Button from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Button onClick={jest.fn()} type="button" className="button">
        Actual button
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('handles onClick event', () => {
    const id = 'test-button';
    const onClickMock = jest.fn();
    const { getByTestId } = render(<Button onClick={onClickMock}>Button</Button>);
    fireEvent.click(getByTestId(id));
    expect(onClickMock).toBeCalledTimes(1);
  });
});
