import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(false);
  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className='mr-2'>
          <button className='btn btn-outline-primary mt-2 mb-2 card-btn-1 rounded-lg'>
            View Product
          </button>
        </Link>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>
        In Stock {quantity}{' '}
      </span>
    ) : (
      <span className='badge badge-danger badge-pill'>Out of Stock </span>
    );
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    if (product.quantity > 0) {
      return (
        showAddToCartButton && (
          <button
            onClick={addToCart}
            className='btn btn-outline-warning mt-2 mb-2 card-btn-1 rounded-lg '
          >
            Add to cart
          </button>
        )
      );
    }
  };

  const alerts = (alert) => {
    if (alert) {
      return (
        <div
          class='alert alert-warning alert-dismissible fade show'
          role='alert'
        >
          <strong>Holy guacamole!</strong> You should check in on some of those
          fields below.
          <button
            type='button'
            class='close'
            data-dismiss='alert'
            aria-label='Close'
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      );
    }
  };
  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className='btn btn-outline-danger mt-2 mb-2 rounded-lg'
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    <div className='card card-inverse shadow p-3 mb-5 bg-white rounded rounded-lg'>
      <div className='card-body'>
        <h5 className='card-title mr-2 text-center'>{product.name}</h5>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url='product' />
        <p className='card-text mt-2'>{product.description}</p>
        <p className='black-10'>Price: {product.price}.00LKR</p>
        <p className='black-9'>
          Category: {product.category && product.category.name}
        </p>
        <p class='card-text'>
          <small class='text-muted'>
            Last updated {moment(product.createdAt).fromNow()} ago
          </small>
        </p>
        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;