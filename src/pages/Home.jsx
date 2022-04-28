import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories,
  getItemsByQuery, getItemsByCategory } from '../services/api';
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

  fetchByCategory = async ({ target }) => {
    const { id } = target;
    const items = await getItemsByCategory(id);
    this.setState({
      cards: items.results,
    });
  }

  // addToCart = async ({ target }) => {
  //   const { id } = target;
  //   const product = await getDetailsById(id);
  //   const newProduct = {
  //     id: product.id,
  //     title: product.title,
  //     price: product.price,
  //     thumbnail: product.thumbnail,
  //     quantity: 1 };
  //   this.setState((prev) => ({
  //     cart: [...prev.cart, newProduct],
  //   }), () => {
  //     const { cart } = this.state;
  //     localStorage.setItem('cart', JSON.stringify(cart));
  //   });
  // }

  render() {
    const { addToCart } = this.props;
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
                    id={ item.id }
                    type="button"
                    key={ item.id }
                    data-testid="category"
                    onClick={ this.fetchByCategory }
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
              {cards.length < 1 && loadSearch && <p>Nenhum produto foi encontrado</p>}
              {cards.length >= 1 && (
                <div className="cards">
                  {cards.map((card, index) => (
                    <div key={ index }>
                      <Link
                        data-testid="product-detail-link"
                        key={ card.id }
                        to={ `/details/${card.id}` }
                      >
                        <div className="card" data-testid="product">
                          <img src={ card.thumbnail } alt={ card.title } />
                          <h3>{ card.title }</h3>
                          <h4>
                            R$
                            { card.price }
                          </h4>
                        </div>
                      </Link>
                      <button
                        id={ card.id }
                        type="button"
                        onClick={ addToCart }
                        data-testid="product-add-to-cart"
                      >
                        ➕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
