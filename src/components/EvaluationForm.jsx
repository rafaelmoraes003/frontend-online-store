import React from 'react';
import PropTypes from 'prop-types';

class EvaluationForm extends React.Component {
  render() {
    const {
      addLocalStorage,
      currentLocal,
      handleChange,
      email,
      comment,
      evaluation,
    } = this.props;
    return (
      <div>
        <form>
          <div>
            <input
              id="email"
              data-testid="product-detail-email"
              type="email"
              value={ email }
              onChange={ handleChange }

            />
            <label htmlFor="evaluation1">
              1
              <input
                data-testid="1-rating"
                type="radio"
                name="evaluation"
                id="evaluation"
                value={ 1 }
                onClick={ handleChange }
              />
            </label>
            <label htmlFor="evaluation2">
              2
              <input
                data-testid="2-rating"
                type="radio"
                name="evaluation"
                id="evaluation"
                value={ 2 }
                onClick={ handleChange }
              />
            </label>
            <label htmlFor="evaluation3">
              3
              <input
                data-testid="3-rating"
                type="radio"
                name="evaluation"
                id="evaluation"
                value={ 3 }
                onClick={ handleChange }
              />
            </label>
            <label htmlFor="evaluation4">
              4
              <input
                data-testid="4-rating"
                type="radio"
                name="evaluation"
                id="evaluation"
                value={ 4 }
                onClick={ handleChange }
              />
            </label>
            <label htmlFor="evaluation5">
              5
              <input
                data-testid="5-rating"
                type="radio"
                name="evaluation"
                id="evaluation"
                value={ 5 }
                onClick={ handleChange }
              />
            </label>
          </div>
          <div>
            <textarea
              id="comment"
              data-testid="product-detail-evaluation"
              value={ comment }
              onChange={ handleChange }
            />
          </div>
          { evaluation !== 0 && (
            <input
              data-testid="submit-review-btn"
              type="submit"
              value="Salvar"
              onClick={ addLocalStorage }
            />
          )}
          { evaluation === 0 && (
            <input
              data-testid="submit-review-btn"
              type="submit"
              value="Salvar"
              onClick={ addLocalStorage }
              disabled
            />
          )}
        </form>
        <div className="allEvaluations">
          { currentLocal.map((item, index) => (
            <div key={ index }>
              <p>
                { item.email }
              </p>
              <p>
                { item.evaluation }
              </p>
              <p>
                { item.comment }
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default EvaluationForm;

EvaluationForm.propTypes = {
  addLocalStorage: PropTypes.func.isRequired,
  currentLocal: PropTypes.arrayOf.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  comment: PropTypes.isRequired,
  evaluation: PropTypes.number.isRequired,
};
