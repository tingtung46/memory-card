import { Card } from "./Card";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { shuffle } from "../utils/shuffle";

export const Gameboard = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  console.log(characters);

  if (isLoaded)
    return (
      <>
        <section className="gameboard">
          <div className="score">
            <h2>Scores:</h2>
            <h2>Best Scores:</h2>
          </div>

          <div className="cards-container">
            {characters.map((chara) => {
              return <Card chara={chara} key={chara.id} />;
            })}
          </div>
        </section>
      </>
    );
};
