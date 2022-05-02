import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      result: JSON.parse(localStorage.getItem('cart')) || [], //
    };
  }

  addToCart = ({ target }) => {
    const { id } = target;
    const { list } = this.state;
    const product = list.find((elemento) => elemento.id === id);
    product.quantity = 1;
    this.setState((prev) => ({
      result: [...prev.result, product],
    }), () => {
      const { result } = this.state;
      localStorage.setItem('cart', JSON.stringify(result));
    });
  }

  fixTest = (id) => {
    this.setState({
      list: id,
    });
  }

  updateLocalStorage = (obj) => {
    localStorage.setItem('cart', JSON.stringify(obj));
  }

  increaseQuantity = ({ target }) => {
    const { result } = this.state;
    const increase = result.find((elemento) => elemento.id === target.id);
    increase.quantity += 1;

    this.setState((prev) => ({
      result: prev.result,
    }), () => {
      this.updateLocalStorage(result);
    });
  }

  descreaseQuantity = ({ target }) => {
    const { result } = this.state;
    const decrease = result.find((elemento) => elemento.id === target.id);
    if (decrease.quantity <= 0) {
      decrease.quantity = 0;
    } else {
      decrease.quantity -= 1;
    }

    this.setState((prev) => ({
      result: prev.result,
    }), () => {
      this.updateLocalStorage(result);
    });
  }

  removeItem = ({ target }) => {
    const { result } = this.state;
    const remove = result.filter((elemento) => elemento.id !== target.id);
    this.setState({
      result: remove,
    }, () => {
      this.updateLocalStorage(remove);
    });
  }

  render() {
    const { result } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home
                addToCart={ this.addToCart }
                test={ this.fixTest }
              />
            </Route>
            <Route path="/cart">
              <Cart
                items={ result }
                increase={ this.increaseQuantity }
                decrease={ this.descreaseQuantity }
                remove={ this.removeItem }
              />
            </Route>
            <Route
              path="/details/:id"
              render={ (props) => (
                <ProductDetails addToCart={ this.addToCart } { ...props } />
              ) }
            />
            <Route
              path="/checkout"
              render={ (props) => (
                <Checkout totalProducts={ result } { ...props } />
              ) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
