import React from 'react';
import Button from './Button';
import API from '../utils/API';

export default function Product({ productId, imgSrc, name, description, price }) {
  async function addOrder() {
    await API.post(
      'orders',
      {
        products: [productId],
      },
      {
        withCredentials: true,
      },
    );
  }

  return (
    <div className="flex-item">
      <img className="product__image" src={imgSrc} alt={name} />
      <div className="item__data">
        <div className="product__title">{name}</div>
        <div className="product__description">{description}</div>
        <div className="product__price">{price}</div>
        <Button onClick={addOrder} type="button" className="new__button">
          Add to cart
        </Button>
      </div>
    </div>
  );
}
