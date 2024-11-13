import { Card } from "./Card";
import drLogo from "../assets/dr-logo.png";

export const GameRound = ({ score, bestScore, characters, handleClick }) => {
  return (
    <>
      <section className="gameboard flex flex-col bg-black/50">
        <div className="header rounded-b-lg px-3 pt-3 pb-4 mb-6 flex flex-col items-center md:bg-black/50">
          <img
            className="w-3/4 h-3/4 md:w-2/4 md:h-2/4"
            src={drLogo}
            alt="Danganronpa Logo"
          />

          <h2 className="font-semibold text-lg mb-5 sm:text-2xl">
            Memory Card Game
          </h2>

          <div className="score flex flex-row justify-center gap-x-5 font-semibold text-base">
            <h2>
              Score{" "}
              <span className="inline-block bg-white text-black ml-2 min-w-6 min-h-6">
                {score}
              </span>
            </h2>
            <h2>
              Best Score{" "}
              <span className="inline-block bg-white text-black ml-2 min-w-6 min-h-6">
                {bestScore}
              </span>
            </h2>
          </div>
        </div>

        <div className="cards-container flex flex-col gap-y-3.5 p-4 mx-auto sm:grid sm:grid-cols-[repeat(2,_224px)] sm:gap-10 md:grid md:grid-cols-[repeat(3,_224px)] md:gap-10 lg:grid-cols-[repeat(4,_224px)]">
          {characters.map((chara) => {
            return (
              <Card handleClick={handleClick} chara={chara} key={chara.id} />
            );
          })}
        </div>
      </section>
    </>
  );
};
