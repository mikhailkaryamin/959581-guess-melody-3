import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`
  }
};

it(`Render correctly audio-player`, () => {
  const {song} = mock;

  const tree = renderer.create(
      <AudioPlayer
        src={song.src}
        isPlaying={true}
        isLoading={true}
        onPlayButtonClick={() => {}}
      >
        <audio />
      </AudioPlayer>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
