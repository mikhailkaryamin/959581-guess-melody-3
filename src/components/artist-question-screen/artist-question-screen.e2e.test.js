import React from "react";
import {
  configure,
  shallow
} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

configure({
  adapter: new Adapter()
});

const mock = {
  artistQuestion:
    {
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: `path`,
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
    }
};

const mockEvent = {
  preventDefault() {}
};

it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const {
    artistQuestion
  } = mock;

  const onAnswer = jest.fn();
  const userAnswer = {
    picture: `path`,
    artist: `John Snow`
  };

  const artistQuestionScr = shallow(
      <ArtistQuestionScreen
        onAnswer={
          onAnswer
        }
        question={
          artistQuestion
        }
        renderPlayer={() => {}}
      />
  );

  const inputOne = artistQuestionScr.find(`input`).at(0);

  inputOne.simulate(`change`, mockEvent);

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer.mock.calls[0][0]).toMatchObject(artistQuestionScr);
  expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
});
