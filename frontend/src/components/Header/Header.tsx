import NavBar from "./NavBar";
import logo from "../../assets/react.svg";

function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <img src={logo} alt="Logo correspondant à React"></img>
      <NavBar />
    </div>
  );
}

export default Header;
