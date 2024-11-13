import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { shuffle } from "../utils/shuffle";
import { fetchData } from "../utils/fetchData";
import { GameRound } from "./GameRound";
import { GameClear } from "./GameClear";
import { useWithSound } from "../utils/useWithSound";
import gameClearBGM from "../assets/sounds/Rare Present Get.mp3";
import monokumaDance from "../assets/loading.gif";

export const Gameboard = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGameClear, setIsGameClear] = useState(false);
  const [score, setScores] = useState(0);
  const [bestScore, setBestScores] = useState(0);
  const { playSound } = useWithSound(gameClearBGM);

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
      const promises = charasID.map((id) => fetchData(id, 3));

      const charaDatas = await Promise.all(promises);

      const allChara = charaDatas.map((chara) => ({
        id: uuidv4(),
        mal_id: chara.data.mal_id,
        name: chara.data.name,
        image: chara.data.images.jpg.image_url,
        visited: false,
      }));

      setCharacters(allChara);
      setIsLoaded(true);
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
      setScores(score + 1);
      selectedCard.visited = true;
    } else {
      if (score > bestScore) {
        setBestScores(score);
        resetGame(charasCopy);
      }

      if (score < bestScore) {
        resetGame(charasCopy);
      }
    }
  };

  //If all cards have been visited
  if (score === 8) {
    const charasCopy = characters.slice();

    playSound();
    setBestScores(0);
    resetGame(charasCopy);
    setIsGameClear(true);
  }

  if (isLoaded && !isGameClear)
    return (
      <>
        <GameRound
          score={score}
          bestScore={bestScore}
          characters={characters}
          handleClick={handleClick}
        />
      </>
    );

  if (isGameClear) {
    return (
      <>
        <GameClear setIsGameClear={setIsGameClear} />
      </>
    );
  }

  return (
    <div className="bg-black h-screen w-screen">
      <img src={monokumaDance} alt="Loading" className="mb-5" />
      <h1>Loading...</h1>
    </div>
  );
};
