import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <div>
        { items.length === 0 ? (
          <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
        ) : items.map((item) => (
          <div key={ item.title }>
            <p data-testid="shopping-cart-product-name">{ item.title }</p>
            <p data-testid="shopping-cart-product-quantity">
              { item.quantity }
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  items: PropTypes.func.isRequired,
};
