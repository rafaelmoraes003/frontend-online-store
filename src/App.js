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
              <Cart items={ cart } />
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
