import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

import { getDetailsById } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    };
  }

  addToCart = async ({ target }) => {
    const { id } = target;
    const details = await getDetailsById(id);
    const product = {
      id: details.id,
      title: details.title,
      price: details.price,
      thumbnail: details.thumbnail,
      quantity: 1 };
    this.setState((prev) => ({
      cart: [...prev.cart, product],
    }), () => {
      const { cart } = this.state;
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }

  increaseQuantity = ({ target }) => {
    const { id } = target;
    const { cart } = this.state;

    this.setState((prev) => ({
      cart: cart.map((elem) => {
        if (elem.id === id) {
          return {...elem, quantity: elem.quantity + 1}
        } return elem
      })
    }), () => {
      const { cart } = this.state;
      localStorage.setItem('cart', JSON.stringify(cart))
    })
  }

  descreaseQuantity = ({ target }) => {
    const { id } = target;
    const { cart } = this.state;

    this.setState((prev) => ({
      cart: cart.map((elem) => {
        if (elem.id === id) {
          return {...elem, quantity: elem.quantity > 0 ? elem.quantity - 1 : 0}
        } return elem
      })
    }), () => {
      const { cart } = this.state;
      localStorage.setItem('cart', JSON.stringify(cart))
    })
  }

  render() {
    const { cart } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home addToCart={ this.addToCart } />
            </Route>
            <Route path="/cart">
              <Cart items={ cart } add={this.increaseQuantity} rem={this.descreaseQuantity} />
            </Route>
            <Route
              path="/details/:id"
              render={ (props) => (
                <ProductDetails addToCart={ this.addToCart } { ...props } />
              ) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
