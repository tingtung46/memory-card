import { Button } from "./Button";
import mute from "../assets/music-note-slash.svg";
import unmute from "../assets/music-note.svg";

export const ToggleMuteButton = ({ isMuted, muteSound, unmuteSound }) => {
  if (isMuted) {
    return (
      <>
        <Button
          icon={mute}
          handleClick={unmuteSound}
          className="icon-btn sticky bottom-5 right-5 block py-1 px-2 bg-red-700 rounded-full border-solid border-white border-2 active:border-black place-self-end opacity-40 hover:opacity-100"
        />
      </>
    );
  } else {
    return (
      <>
        <Button
          icon={unmute}
          handleClick={muteSound}
          className="icon-btn sticky bottom-5 right-5 block py-1 px-2 bg-red-700 rounded-full border-solid border-white border-2 active:border-black place-self-end opacity-40 hover:opacity-100"
        />
      </>
    );
  }
};
