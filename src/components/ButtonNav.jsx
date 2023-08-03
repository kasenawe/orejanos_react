import "./ButtonNav.css";

function ButtonNav({ buttonText, onCanvas, onLogout }) {
  return (
    <button className={`button-nav ${onCanvas} ${onLogout}`}>
      {buttonText}
    </button>
  );
}

export default ButtonNav;
