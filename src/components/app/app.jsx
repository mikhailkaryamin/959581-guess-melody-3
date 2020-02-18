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
import PropTypes from "prop-types";
import {
  GameType
} from "../../const.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1
    };
  }

  _renderGameScreen() {
    const {
      errorsCount,
      questions
    } = this.props;
    const {
      step
    } = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={
            errorsCount
          }
          onWelcomeButtonClick={() => {
            this.setState({
              step: 0,
            });
          }}
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
              <ArtistQuestionScreen
                question={question}
                onAnswer={() => {
                  this.setState((prevState) => ({
                    step: prevState.step + 1,
                  }));
                }}
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
              <GenreQuestionScreen
                question={question}
                onAnswer={() => {
                  this.setState((prevState) => ({
                    step: prevState.step + 1,
                  }));
                }}
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
            <ArtistQuestionScreen
              question={
                artistQuestion
              }
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1,
                }));
              }}
            />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreen
              question={
                genreQuestion
              }
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1,
                }));
              }}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.object.isRequired
  ),
};

export default App;
