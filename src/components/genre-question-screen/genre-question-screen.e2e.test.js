import React from "react";
import {
  configure,
  shallow
} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen.jsx";

configure({
  adapter: new Adapter()
});

const mock = {
  genreQuestion: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      }, {
        src: `path`,
        genre: `blues`,
      }, {
        src: `path`,
        genre: `jazz`,
      }, {
        src: `path`,
        genre: `rock`,
      },
    ],
  },
};

it(`When user answers genre question form is not sent`, () => {
  const {
    genreQuestion
  } = mock;
  const onAnswer = jest.fn();
  const userAnswer = [false, true, false, false];

  const genreQuestionScr = shallow(
      <GenreQuestionScreen
        onAnswer={
          onAnswer
        }
        question={
          genreQuestion
        }
      />
  );

  const form = genreQuestionScr.find(`form`);
  const inputTwo = genreQuestionScr.find(`input`).at(1);

  inputTwo.simulate(`change`, {target: {checked: true}});
  form.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer.mock.calls[0][0]).toMatchObject(genreQuestionScr);
  expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);

  expect(
      genreQuestionScr.find(`input`).map((it) => it.prop(`checked`))
  ).toEqual(userAnswer);
});
