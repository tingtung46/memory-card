export const Button = ({ text, icon, handleClick, className }) => {
  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {text ? text : icon}
      </button>
    </>
  );
};
