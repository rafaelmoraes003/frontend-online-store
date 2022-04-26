import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { search, categories } = this.state;
    return (
      <div className="container">
        <aside>
          <div className="categories">
            { categories.map((item) => (
              <button
                type="button"
                key={ item.id }
                data-testid="category"
              >
                { item.name }
              </button>
            ))}
          </div>
        </aside>
        <div className="search-area">
          <input
            type="text"
            value={ search }
            onChange={ (event) => this.setState({ search: event.target.value }) }
          />
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <i className="fa-solid fa-cart-shopping" />
          </Link>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
