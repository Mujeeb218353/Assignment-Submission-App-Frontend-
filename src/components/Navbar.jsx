import { useContext } from "react";
import { GlobalContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import ThemeChanger from "../components/ThemeChanger";
import SMITLogo from "../assets/SMIT.png";
import Tabs from "../components/Tabs";

const NavbarFunc = () => {
  const { user, logoutUser, theme } = useContext(GlobalContext);

  return (
    <div
      className={"navbar shadow-md fixed flex justify-between z-10"}
      data-theme={theme}
    >
      <div className="flex gap-4">
        <div className="dropdown dropdown-start">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Profile"
                src={user.profile ? user.profile : "profile.png"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>
          </ul>
        </div>
        <div className="flex gap-4">
          
        </div>
      </div>
      <div className="btn btn-ghost btn-circle avatar">
        <Link to="/" className="w-10 rounded-full">
          <img alt="SMIT Logo" src={SMITLogo} />
        </Link>
      </div>
      <div>
        <ThemeChanger position={""} />
      </div>
    </div>
  );
};

export default NavbarFunc;