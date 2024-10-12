import Card from "./Card";

export const Gameboard = () => {
  return (
    <>
      <section className="gameboard">
        <div className="score">
          <h2>Scores:</h2>
          <h2>Best Scores:</h2>
        </div>

        <div className="cards-container">
          <Card />
        </div>
      </section>
    </>
  );
};
