import { NavLink } from "react-router-dom";



function NavBar() {
    return (
    <div>
        <NavLink
            to="/"
            className={({ isActive }) =>
            isActive ? "text-indigo-600 underline font-bold" : "text-slate-600"
            }
        >
            Accueil
        </NavLink>
        <NavLink
            to="/ads/create"
            className={({ isActive }) =>
            isActive ? "text-indigo-600 underline font-bold" : "text-slate-600"
            }
        >
            Créer une annonce
        </NavLink>
    </div>
    )
}

export default NavBar;