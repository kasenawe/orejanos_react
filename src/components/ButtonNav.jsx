import "./ButtonNav.css";

function ButtonNav({ buttonText, onCanvas }) {
  return <button className={`button-nav ${onCanvas}`}> {buttonText}</button>;
}

export default ButtonNav;
