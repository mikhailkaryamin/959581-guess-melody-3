import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import {
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import PropTypes from "prop-types";

const welcomeButtonHandler = () => {};

const App = (props) => {
  const {errorsCount, questions} = props;
  const artistQuestion = questions.find((typeQuestion) =>
    typeQuestion.type === `artist`
  );
  const genreQuestion = questions.find((typeQuestion) =>
    typeQuestion.type === `genre`
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/dev-genre">
          <WelcomeScreen
            errorsCount={errorsCount}
            onWelcomeButtonClick={welcomeButtonHandler}
          />
        </Route>
        <Route exact path="/dev-artist">
          <ArtistQuestionScreen
            artistQuestion={artistQuestion}
          />
        </Route>
        <Route exact path="/">
          <GenreQuestionScreen
            genreQuestion={genreQuestion}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.object.isRequired
  ),
};

export default App;
