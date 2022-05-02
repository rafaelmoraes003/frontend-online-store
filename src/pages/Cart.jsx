import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  render() {
    const { items, increase, decrease, remove } = this.props;
    return (
      <div>
        { items.length === 0 ? (
          <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
        ) : items.map((item) => (
          <div key={ item.id }>

            <p data-testid="shopping-cart-product-name">{ item.title }</p>

            <button
              id={ item.id }
              type="button"
              onClick={ remove }
            >
              <i id={ item.id } className="fa-solid fa-x" />
            </button>
            <button
              data-testid="product-increase-quantity"
              type="button"
              id={ item.id }
              onClick={ increase }
            >
              <i id={ item.id } className="fa-solid fa-plus" />
            </button>

            <span data-testid="shopping-cart-product-quantity">{ item.quantity }</span>

            <button
              data-testid="product-decrease-quantity"
              type="button"
              id={ item.id }
              onClick={ decrease }
            >
              <i id={ item.id } className="fa-solid fa-minus" />
            </button>
          </div>
        ))}
        <Link to="/checkout" data-testid="checkout-products">
          <button
            type="button"
          >
            Finalizar compra
          </button>
        </Link>
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
