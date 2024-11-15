export const Button = ({ text, icon, handleClick, className }) => {
  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {icon ? (
          <>
            <img src={icon} alt="Toggle Sound" className="w-full h-full" />
          </>
        ) : (
          text
        )}
      </button>
    </>
  );
};
