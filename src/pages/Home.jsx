import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getItemsByQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      categories: [],
      cards: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  fetchByQuery = async () => {
    const { search } = this.state;
    const items = await getItemsByQuery(search);
    this.setState({ cards: items.results });
  }

  render() {
    const { search, categories, cards } = this.state;
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
            data-testid="query-input"
            onChange={ (event) => this.setState({ search: event.target.value }) }
          />
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <i className="fa-solid fa-cart-shopping" />
          </Link>
          <button
            onClick={ this.fetchByQuery }
            data-testid="query-button"
            type="button"
          >
            Pesquisar
          </button>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        {cards.length < 1 && <p>Nenhum produto foi encontrado</p>}
        {cards.length > 1 && (
          <div className="card">
            {cards.map((card) => (
              <div key={ card.id } data-testid="product">
                <img src={ card.thumbnail } alt={ card.title } />
                <h3>{ card.title }</h3>
                <h4>{ card.price }</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
