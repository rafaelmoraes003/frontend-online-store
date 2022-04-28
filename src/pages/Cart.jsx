import React from 'react';
import PropTypes from 'prop-types';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

class Cart extends React.Component {
  render() {
    const { items, add, rem } = this.props;
    return (
      <div>
        { items.length === 0 ? (
          <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
        ) : items.map((item) => (
          <div key={ item.title }>

            <p data-testid="shopping-cart-product-name">{ item.title }</p>
            <button><i className="fa-solid fa-xmark"></i></button>
            <button
              data-testid="product-increase-quantity"
              id={ item.id }
              onClick={add}
            >
              +
            </button>

            <span data-testid="shopping-cart-product-quantity">
            { item.quantity }
            </span>

            <button 
              data-testid="product-decrease-quantity"
              id={ item.id }
              onClick={rem}
            >
              -
            </button>
          </div>
        ))}
        <button>Finalizar compra</button>
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  items: PropTypes.func.isRequired,
};
