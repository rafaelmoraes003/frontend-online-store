import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getItemsByQuery } from '../services/api';

import './Home.style.css';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      categories: [],
      cards: [],
      loadSearch: false, // Estado adicionado para a mensagem de "produto não encontrado" aparecer somente após clicar no botão
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  fetchByQuery = async () => {
    const { search } = this.state;
    const items = await getItemsByQuery(search);
    this.setState({
      cards: items.results,
      loadSearch: true, // Mudança do estado da mensagem de "produto não encontrado"
    });
  }

  render() {
    const { search, categories, cards, loadSearch } = this.state;
    return (
      <div className="container">
        <div className="search-area">
          <input
            type="text"
            value={ search }
            data-testid="query-input"
            onChange={ (event) => this.setState({ search: event.target.value }) }
          />
          <button
            onClick={ this.fetchByQuery }
            data-testid="query-button"
            type="button"
          >
            Pesquisar
          </button>
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <i className="fa-solid fa-cart-shopping" />
          </Link>
        </div>
        <div className="content-area">
          <aside>
            <div className="categories">
              { categories.map((item) => (
                <div className="categorie" key={ item.id }>
                  <button
                    type="button"
                    key={ item.id }
                    data-testid="category"
                  >
                    { item.name }
                  </button>
                </div>
              ))}
            </div>
          </aside>
          <section>
            <div className="cards-area">
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
              {cards.length < 1 && <p>Nenhum produto foi encontrado</p>}
              {cards.length > 1 && (
                <div className="cards">
                  {cards.map((card) => (
                    <div className="card" key={ card.id } data-testid="product">
                      <img src={ card.thumbnail } alt={ card.title } />
                      <h3>{ card.title }</h3>
                      <h4>
                        R$
                        { card.price }
                      </h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
        {cards.length < 1 && loadSearch && <p>Nenhum produto foi encontrado</p>}
        {cards.length >= 1 && (
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
