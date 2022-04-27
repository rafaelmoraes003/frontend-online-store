import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDetailsById } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
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
    console.log(data);

    this.setState({
      product: data,
    });
  }

  render() {
    const { product } = this.state;
    return (
      <>
        <h1>Detalhes do produto</h1>
        <h3 data-testid="product-detail-name">{ product.title }</h3>
        <img
          src={ product.thumbnail }
          alt={ product.title }
        />
        <h4>{ product.price }</h4>
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
};

export default ProductDetails;
