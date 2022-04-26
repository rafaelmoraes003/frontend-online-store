import React from 'react';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
    };
  }

  render() {
    const { search } = this.state;
    return (
      <div className="container">
        <div className="search-area">
          <input
            type="text"
            value={ search }
            onChange={ (event) => this.setState({ search: event.target.value }) }
          />
        </div>
        <div className="result-area">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
