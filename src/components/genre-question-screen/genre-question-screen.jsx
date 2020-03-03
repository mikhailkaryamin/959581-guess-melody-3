import React, {
  PureComponent
} from "react";
import PropTypes from "prop-types";
import GenreQuestionItem from "../genre-question-item/genre-question-item.jsx";

class GenreQuestionScreen extends PureComponent {
  render() {
    const {
      onAnswer,
      question,
      onChange,
      renderPlayer,
      userAnswers,
    } = this.props;

    const {
      answers,
      genre
    } = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer();
          }}
        >
          {answers.map((answer, i) => (
            <GenreQuestionItem
              answer={
                answer
              }
              id={
                i
              }
              key={
                `${i}-${answer.src}`
              }
              onChange={
                onChange
              }
              renderPlayer={
                renderPlayer
              }
              userAnswer={
                userAnswers[i]
              }
            />
          ))}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          genre: PropTypes.string.isRequired,
        }),
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          genre: PropTypes.string.isRequired,
        }),
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          genre: PropTypes.string.isRequired,
        })
    )
  }),
  renderPlayer: PropTypes.func.isRequired,
};

export default GenreQuestionScreen;
