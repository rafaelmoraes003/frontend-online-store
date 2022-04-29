import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDetailsById } from '../services/api';
import EvaluationForm from './components/EvaluationForm';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      currentLocal: JSON.parse(localStorage.getItem('evaluations')) || [],
      email: '',
      evaluation: 0,
      comment: '',
    };
  }

  componentDidMount() {
    this.productDetails();
  }

  productDetails = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = await getDetailsById(id);

    this.setState({
      product: data,
    });
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  addLocalStorage = () => {
    const { email, evaluation, comment } = this.state;
    const evalObj = { email, evaluation, comment };
    // const currentLocal = JSON.parse(localStorage.getItem('evaluations')) || [];
    this.setState((prev) => ({
      currentLocal: [...prev.currentLocal, evalObj],
      email: '',
      evaluation: 0,
      comment: '',
    }), () => {
      const { currentLocal } = this.state;
      localStorage.setItem('evaluations', JSON.stringify(currentLocal));
    });
  }

  render() {
    const { product, currentLocal, email, comment, evaluation } = this.state;
    const { addToCart } = this.props;

    return (
      <>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <h1>Detalhes do produto</h1>
        <h3 data-testid="product-detail-name">{ product.title }</h3>
        <img
          src={ product.thumbnail }
          alt={ product.title }
        />
        <h4>{ product.price }</h4>
        <button
          id={ product.id }
          type="button"
          onClick={ addToCart }
          data-testid="product-detail-add-to-cart"
        >
          ➕
        </button>

        <EvaluationForm
          currentLocal={ currentLocal }
          addLocalStorage={ this.addLocalStorage }
          handleChange={ this.handleChange }
          email={ email }
          comment={ comment }
          evaluation={ evaluation }
        />
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
