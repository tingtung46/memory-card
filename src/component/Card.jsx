export const Card = ({ handleClick, chara }) => {
  return (
    <>
      <div className="card" onClick={handleClick} data-id={chara.mal_id}>
        <img src={chara.image} alt={chara.name} />
        <p>{chara.name}</p>
      </div>
    </>
  );
};
