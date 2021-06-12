import { connect } from 'react-redux';
import OrderList from './OrderList';
import { setLoading, setUserData } from '../store/actions';

function mapStateToProps(state) {
  return {
    state: state.loadingState,
    user: state.userData,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (isLoading) => dispatch(setLoading({ isLoading })),
    setUserData: (id) => dispatch(setUserData({ id })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
