import { render } from 'test-utils';

import Product from '../Product';

const props = {
  key: 1,
  imgSrc: 'fakesource',
  name: 'testName',
  description: 'test description',
  price: 8800,
};
describe('Product', () => {
  it('renders correctly', () => {
    const { container } = render(<Product {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
