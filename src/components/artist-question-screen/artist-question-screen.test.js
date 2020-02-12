import React from "react";
import renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

const ARTIST_QUESTION_TEST = {
  type: `artist`,
  song: {
    artist: `Jim Beam`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
  answers: [{
    picture: `path`,
    artist: `John Snow`,
  }, {
    picture: `path`,
    artist: `Jack Daniels`,
  }, {
    picture: `path`,
    artist: `Jim Beam`,
  }],
};

it(`Artist question render correctly`, () => {
  const tree = renderer.create(
      <ArtistQuestionScreen
        onAnswer={()=> {}}
        question={ARTIST_QUESTION_TEST}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
