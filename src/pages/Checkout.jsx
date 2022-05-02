import React from 'react';
import PropTypes from 'prop-types';
import CheckoutForm from '../components/CheckoutForm';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      paymentMethod: '',
    };
  }

  componentDidMount() {
    this.renderFinalPrice();
  }

  renderFinalPrice = () => {
    const { totalProducts } = this.props;

    totalProducts.forEach((elemento) => {
      this.setState((prev) => ({
        totalPrice: prev.totalPrice + elemento.price,
      }));
    });
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  validateInfos = () => {
    const { fullName, email, cpf, phone, cep, address, paymentMethod } = this.state;
    if (
      fullName.length > 0
      && email.length > 0
      && cpf.length > 0
      && phone.length > 0
      && cep.length > 0
      && address.length > 0
      && paymentMethod.length > 0
    ) {
      this.setState({
        fullName: '',
        email: '',
        cpf: '',
        phone: '',
        cep: '',
        address: '',
        paymentMethod: '',
      });
      const { history } = this.props;
      history.push('/');
    } else {
      alert('Preencha todos os campos.');
    }
  }

  render() {
    const { totalProducts } = this.props;
    const { totalPrice } = this.state;
    return (
      <div>
        <h1>Seus produtos:</h1>
        <div className="products">
          {totalProducts.map((product) => (
            <div key={ product.id }>
              <img src={ product.thumbnail } alt={ product.title } />
              <h3>{product.title}</h3>
              <h4>
                Preço: R$
                { product.price }
              </h4>
            </div>
          ))}
        </div>
        <h2>
          Preço total:
          { totalPrice.toFixed(2) }
        </h2>
        <form>
          <CheckoutForm
            testId="checkout-fullname"
            placeholder="Nome Completo"
            id="fullName"
            onChange={ this.handleChange }
          />
          <CheckoutForm
            testId="checkout-email"
            placeholder="E-mail"
            id="email"
            onChange={ this.handleChange }
          />
          <CheckoutForm
            testId="checkout-cpf"
            placeholder="CPF"
            id="cpf"
            onChange={ this.handleChange }
          />
          <CheckoutForm
            testId="checkout-phone"
            placeholder="Telefone"
            id="phone"
            onChange={ this.handleChange }
          />
          <CheckoutForm
            testId="checkout-cep"
            placeholder="CEP"
            id="cep"
            onChange={ this.handleChange }
          />
          <CheckoutForm
            testId="checkout-address"
            placeholder="Endereço"
            id="address"
            onChange={ this.handleChange }
          />
        </form>
        <div className="payment">
          <h2>Método de pagamento</h2>

          <div>
            <label htmlFor="paymentMethod" onChange={ this.handleChange }>
              Boleto
              <input
                type="radio"
                id="paymentMethod"
                value="boleto"
                name="pay"
                required
              />
            </label>

            <label htmlFor="paymentMethod" onChange={ this.handleChange }>
              Cartão de Crédito
              <input type="radio" id="paymentMethod" value="visa" name="pay" />
              <input type="radio" id="paymentMethod" value="mastercard" name="pay" />
              <input type="radio" id="paymentMethod" value="elo" name="pay" />
            </label>
          </div>
          <button type="button" onClick={ this.validateInfos }>Comprar</button>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  totalProducts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}; //

export default Checkout;
