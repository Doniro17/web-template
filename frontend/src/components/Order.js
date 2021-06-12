/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Button from './Button';
import API from '../utils/API';

export default function Order({
  orderId,
  imgSrc,
  name,
  price,
  courierName,
  courierNumber,
  status,
}) {
  async function cancelOrder() {
    await API.delete(
      `orders/${orderId}`,
      {
        withCredentials: true,
      },
    );
    window.location.reload(false);
  }

  return (
    <div className="order">
      <img className="order__image" src={imgSrc} alt={name} />
      <div className="order__data">
        <div className="order__description">{name}</div>
        <div className="order__description">
          Courier: <b>{(!courierName ? '-' : courierName)}</b> <b>{courierNumber}</b>
        </div>
        <div className="order__description">
          Status: <b>{status}</b>
        </div>
        <div className="order__price">${price}</div>
        <Button onClick={cancelOrder} type="button" className="order__button">
          Cancel
        </Button>
        <Button disabled={status !== 'delivered'} onClick={cancelOrder} type="button" className="order__button recieved__mod">
          Recieved
        </Button>
      </div>
    </div>
  );
}
