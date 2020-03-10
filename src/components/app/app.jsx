import React,
{
  PureComponent
} from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import GameScreen from "../../components/game-screen/game-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
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
} from "../../reducer/game/game.js";
import {
  AuthorizationStatus
} from "../../reducer/user/user.js";
import PropTypes from "prop-types";
import AuthScreen from "../auth-screen/auth-screen.jsx";
import {
  GameType
} from "../../const.js";
import withActiveAudioPlayer from "../../hocs/with-active-player/with-active-player.js";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer.js";
import {
  getStep,
  getMistakes,
  getMaxMistakes
} from "../../reducer/game/selectors.js";
import {
  getQuestions
} from "../../reducer/data/selectors.js";
import {
  getAuthorizationStatus
} from "../../reducer/user/selectors.js";
import {
  Operation as UserOperation
} from "../../reducer/user/user.js";

const GenreQuestionScreenWrapped = withActiveAudioPlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActiveAudioPlayer(ArtistQuestionScreen);

class App extends PureComponent {
  _renderGameScreen() {
    const {
      authorizationStatus,
      login,
      maxMistakes,
      mistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
      resetGame,
    } = this.props;

    const question = questions[step];
    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={
            maxMistakes
          }
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return (
          <WinScreen
            questionsCount={questions.length}
            mistakesCount={mistakes}
            onReplayButtonClick={resetGame}
          />
        );
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return (
          <AuthScreen
            onReplayButtonClick={resetGame}
            onSubmit={login}
          />
        );
      }

      return null;
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
          <Route exact path="/dev-auth">
            <AuthScreen
              onReplayButtonClick={() => {}}
              onSubmit={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.object.isRequired
  ),
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  maxMistakes: getMaxMistakes(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  }
});

export {
  App
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
