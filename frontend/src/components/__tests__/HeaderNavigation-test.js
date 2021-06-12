import { render } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../../App/context';
import HeaderNavigation from '../HeaderNavigation';

let context = { user: { roles: ['client', 'courier'] } };

describe('HeaderNavigation', () => {
  it('renders correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <UserContext.Provider value={context}>
          <HeaderNavigation />
        </UserContext.Provider>
      </BrowserRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Correct navigation render for client', () => {
    context = { user: { roles: ['client'] } };
    const { queryByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={context}>
          <HeaderNavigation />
        </UserContext.Provider>
      </BrowserRouter>,
    );
    expect(queryByText('Product')).toBeInTheDocument();
    expect(queryByText('Orders')).toBeInTheDocument();
    expect(queryByText('Delivery')).not.toBeInTheDocument();
    expect(queryByText('Requests')).not.toBeInTheDocument();
  });
  it('Correct navigation render for courier', () => {
    context = { user: { roles: ['courier'] } };
    const { queryByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={context}>
          <HeaderNavigation />
        </UserContext.Provider>
      </BrowserRouter>,
    );
    expect(queryByText('Product')).not.toBeInTheDocument();
    expect(queryByText('Orders')).not.toBeInTheDocument();
    expect(queryByText('Delivery')).toBeInTheDocument();
    expect(queryByText('Requests')).toBeInTheDocument();
  });
});
