import { Card } from "./Card";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { shuffle } from "../utils/shuffle";

export const Gameboard = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scores, setScores] = useState(0);
  const [bestScores, setBestScores] = useState(0);

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
      if (scores > bestScores) {
        setBestScores(scores);
        resetGame(charasCopy);
      }

      if (scores < bestScores) {
        resetGame(charasCopy);
      }

      //If all cards have been visited
      if (scores === bestScores) {
        resetGame(charasCopy);
      }
    }
  };

  if (isLoaded)
    return (
      <>
        <section className="gameboard">
          <div className="score">
            <h2>Scores: {scores}</h2>
            <h2>Best Scores: {bestScores}</h2>
          </div>

          <div className="cards-container">
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
