import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Product from './Product';
import API from '../utils/API';

export default function ProductList(props) {
  const [state, setProducts] = useState({
    products: [],
  });
  const history = useHistory();
  const {
    state: { isLoading },
    setLoading,
  } = props;
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const result = await API.get('products/', {
        withCredentials: true,
      }).catch((e) => {
        if (e.response.status === 401) {
          history.push('/login');
        }
      });
      setProducts(result.data);
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <section>
      {isLoading === true ? (
        <div>Loading.. </div>
      ) : (
        <ul className="flex-container">
          {state.products.map((product) => (
            <Product
              key={product.id}
              productId={product.id}
              imgSrc={`/dist/images/${product.image}.png`}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
