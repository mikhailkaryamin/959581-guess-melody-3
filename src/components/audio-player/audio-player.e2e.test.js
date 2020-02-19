import React from "react";
import {
  mount,
  configure
} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player.jsx";

configure({adapter: new Adapter()});

const mock = {
  song: {
    src: `path`
  }
};

const playButtonClass = `track__button--play`;
const pauseButtonClass = `track__button--pause`;

it(`When user use play button`, () => {
  const {song} = mock;
  const onPlayButtonClick = jest.fn();
  const isPlaying = true;

  const audioPlayer = mount(<AudioPlayer
    src={song.src}
    isPlaying={isPlaying}
    onPlayButtonClick={onPlayButtonClick}
  />);

  const playButtonElem = audioPlayer.find(`.track__button`);
  playButtonElem.simulate(`click`);

  expect(playButtonElem.hasClass(pauseButtonClass)).toEqual(true);
});

it(`When user use pause button`, () => {
  const {song} = mock;
  const onPlayButtonClick = jest.fn();
  const isPlaying = false;

  const audioPlayer = mount(<AudioPlayer
    src={song.src}
    isPlaying={isPlaying}
    onPlayButtonClick={onPlayButtonClick}
  />);

  const playButtonElem = audioPlayer.find(`.track__button`);
  playButtonElem.simulate(`click`);

  expect(playButtonElem.hasClass(playButtonClass)).toEqual(true);
});

