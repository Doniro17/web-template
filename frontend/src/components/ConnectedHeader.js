import { connect } from 'react-redux';
import HeaderNavigation from './HeaderNavigation';
import { setUserData, setLoading } from '../store/actions';
// import API from '../utils/API';

// async function onLogoutClick(history) {
//   await API.get('users/logout', {
//     withCredentials: true,
//   });
//   history.push('/login');
// }

function mapStateToProps(state) {
  return {
    user: state.userData,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (id, login, roles) => dispatch(setUserData({ id, login, roles })),
    setLoading: (isLoading) => dispatch(setLoading({ isLoading })),
  };
};

// const cookieValue = document.cookie
//   .split('; ')
//   .find((row) => row.startsWith('loggedIn'))
//   .split('=')[1];
// console.log(cookieValue);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavigation);
