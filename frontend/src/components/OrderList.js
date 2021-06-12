/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Order from './Order';
import API from '../utils/API';

export default function OrderList(props) {
  const [state, setOrders] = useState({
    orders: [],
  });
  const history = useHistory();
  const {
    state: { isLoading },
    setLoading,
  } = props;
  // console.log(props);
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      const user = await API.get('users/profile', {
        withCredentials: true,
      }).catch((e) => {
        if (e.response.status === 401) {
          history.push('/login');
        }
      });
      const ordersResponse = await API.get(`users/${user.data.id}/orders`, {
        withCredentials: true,
      });
      async function func(elem) {
        const product = await API.get(`products/${elem.products[0]}`, {
          withCredentials: true,
        });
        const courier = await API.get(`users/${elem.courierId}`, {
          withCredentials: true,
        });
        elem.name = product.data.name;
        elem.price = product.data.price;
        elem.courierName = courier.data.username;
        elem.courierNumber = courier.data.phone;
        elem.image = product.data.image;
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < ordersResponse.data.orders.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await func(ordersResponse.data.orders[i]);
      }
      setOrders(ordersResponse.data);
      setLoading(false);
      console.log(ordersResponse.data.orders);
    };
    getOrders();
  }, []);

  return (
    <section>
      {isLoading === true ? (
        <div>Loading.. </div>
      ) : (
        <ul className="flex-container">
          {state.orders.length === 0 && <div key="error">You dont have any orders yet</div>}
          {state.orders.map((order) => (
            <Order
              key={order.id}
              orderId={order.id}
              imgSrc={`/dist/images/${order.image}.png`}
              name={order.name}
              price={order.price}
              courierName={order.courierName}
              courierNumber={order.courierNumber}
              status={order.status}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
