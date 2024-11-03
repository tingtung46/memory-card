import { Card } from "./Card";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { shuffle } from "../utils/shuffle";
import drLogo from "../assets/dr-logo.png";
import monokumaDance from "../assets/loading.gif";

export const Gameboard = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [score, setScores] = useState(0);
  const [bestScore, setBestScores] = useState(0);

  const charasID = useMemo(
    () => [
      "63851",
      "63845",
      "65541",
      "73203",
      "73205",
      "73227",
      "73235",
      "65523",
    ],
    []
  );

  useEffect(() => {
    shuffle(charasID);

    const getCharas = async (charasID) => {
      try {
        const promises = charasID.map(async (id) => {
          const res = await fetch(
            `https://api.jikan.moe/v4/characters/${id}/full`,
            { mode: "cors" }
          );

          return await res.json();
        });

        const charasData = await Promise.all(promises);

        const allChara = charasData.map((chara) => ({
          id: uuidv4(),
          mal_id: chara.data.mal_id,
          name: chara.data.name,
          image: chara.data.images.jpg.image_url,
          visited: false,
        }));

        setCharacters(allChara);
        setIsLoaded(true);
      } catch (error) {
        return console.error("Fetch failed", error);
      }
    };

    getCharas(charasID);
  }, [charasID]);

  const resetGame = (charasCopy) => {
    setScores(0);

    charasCopy.forEach((chara) => (chara.visited = false));

    shuffle(charasCopy);
    setCharacters(charasCopy);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = (e) => {
    const charasCopy = characters.slice();
    const selectedCard = charasCopy.find(
      (chara) => chara.mal_id === +e.currentTarget.getAttribute("data-id")
    );

    shuffle(charasCopy);
    setCharacters(charasCopy);

    if (selectedCard.visited === false) {
      setScores((prevScores) => prevScores + 1);
      selectedCard.visited = true;
    } else {
      if (score > bestScore) {
        setBestScores(score);
        resetGame(charasCopy);
      }

      if (score < bestScore) {
        resetGame(charasCopy);
      }

      //If all cards have been visited
      if (score === bestScore) {
        resetGame(charasCopy);
      }
    }
  };

  if (isLoaded)
    return (
      <>
        <section className="gameboard flex flex-col bg-black/50">
          <div className="header rounded-b-lg px-3 pt-3 pb-4 mb-6 flex flex-col items-center">
            <img className="w-4/5 h-4/5" src={drLogo} alt="Danganronpa Logo" />

            <h2 className="font-semibold text-lg mb-5 sm:text-2xl">
              Memory Card Game
            </h2>

            <div className="score flex flex-row justify-center gap-x-5 font-semibold text-base">
              <h2>Score: {score}</h2>
              <h2>Best Score: {bestScore}</h2>
            </div>
          </div>

          <div className="cards-container flex flex-col gap-y-3.5 p-4 mx-auto sm:grid sm:grid-cols-[repeat(2,_224px)] sm:gap-10 md:grid md:grid-cols-[repeat(4,_224px)] md:gap-10">
            {characters.map((chara) => {
              return (
                <Card handleClick={handleClick} chara={chara} key={chara.id} />
              );
            })}
          </div>
        </section>
      </>
    );

  return (
    <div className="bg-black">
      <img src={monokumaDance} alt="Loading" className="mb-5" />
      <h1>Loading...</h1>
    </div>
  );
};
