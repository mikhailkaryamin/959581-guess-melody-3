import React,
{
  PureComponent
} from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import GameScreen from "../../components/game-screen/game-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import {
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import {
  connect
} from "react-redux";
import {
  ActionCreator
} from "../../reducer.js";
import PropTypes from "prop-types";
import {
  GameType
} from "../../const.js";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.jsx";

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

class App extends PureComponent {
  _renderGameScreen() {
    const {
      maxMistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
    } = this.props;

    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={
            maxMistakes
          }
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={
                question.type
              }
            >
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={
                question.type
              }
            >
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {
      questions
    } = this.props;

    const artistQuestion = questions.find((typeQuestion) =>
      typeQuestion.type === GameType.ARTIST
    );
    const genreQuestion = questions.find((typeQuestion) =>
      typeQuestion.type === GameType.GENRE
    );

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {
              this._renderGameScreen()
            }
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreenWrapped
              question={
                artistQuestion
              }
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreenWrapped
              question={
                genreQuestion
              }
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.object.isRequired
  ),
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  }
});

export {
  App
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
