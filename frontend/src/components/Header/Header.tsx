import NavBar from "./NavBar";
import logo from "../../assets/react.svg";
import CategoriesButtons from "./CategoriesButtons";

function Header() {
  return (
    <div>
      <div className="flex justify-left items-center gap-8">
        <img src={logo} alt="Logo correspondant à React"></img>
        <NavBar />
      </div>
      <div>
        <CategoriesButtons />
      </div>
    </div>
  );
}

export default Header;