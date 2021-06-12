import { connect } from 'react-redux';
import ProductList from './ProductList';
import { setLoading } from '../store/actions';

function mapStateToProps(state) {
  return {
    state: state.loadingState,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (isLoading) => dispatch(setLoading({ isLoading })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
