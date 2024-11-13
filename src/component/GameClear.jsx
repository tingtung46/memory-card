import gameComplete from "../assets/game-clear.gif";
import { Button } from "./Button";

export const GameClear = ({ setIsGameClear }) => {
  const playAgain = (e) => {
    e.preventDefault();
    setIsGameClear(false);
  };

  return (
    <>
      <section className="h-screen w-screen flex flex-col justify-center place-items-center gap-7 bg-black">
        <div className="w-80 h-auto md:w-[40rem] md:h-auto border-double border-pink-600 border-8 rounded-lg">
          <img className="w-full h-full" src={gameComplete} alt="Game Clear" />
        </div>

        <div className="">
          <h1 className="mb-4">Play again?</h1>

          <Button
            text="Yes!"
            icon=""
            handleClick={playAgain}
            className="text-xl font-bold py-2 px-4 bg-pink-600 rounded-md border-solid border-white border-2 active:border-black active:text-black"
          />
        </div>
      </section>
    </>
  );
};
