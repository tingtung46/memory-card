export const Card = ({ handleClick, chara }) => {
  return (
    <>
      <div
        className="card w-56 h-87.5 pb-3 pt-5 px-5 rounded-2xl bg-pink-600 mx-auto"
        onClick={handleClick}
        data-id={chara.mal_id}
      >
        <div>
          <img
            className="w-full h-full rounded-md"
            src={chara.image}
            alt={chara.name}
          />
          <h2 className="text-center mt-2 text-xl font-semibold">
            {chara.name}
          </h2>
        </div>
      </div>
    </>
  );
};
