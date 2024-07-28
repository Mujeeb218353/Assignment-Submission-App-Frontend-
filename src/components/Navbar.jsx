import { useContext } from "react";
import { GlobalContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import ThemeChanger from "../components/ThemeChanger";
import SMITLogo from "../assets/SMIT.png";

const NavbarFunc = () => {
  const { user, logoutUser, theme } = useContext(GlobalContext);

  return (
    <div
      className={"navbar shadow-md fixed flex justify-between z-10"}
      data-theme={theme}
    >
      <div className="">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
          >
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="btn btn-ghost btn-circle avatar">
        <Link to="/" className="w-10 rounded-full">
          <img alt="SMIT Logo" src={SMITLogo} />
        </Link>
      </div>
      <div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Profile"
                src={user.profile ? user.profile : 'profile.png'}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
      <ThemeChanger />
    </div>
  );
};

export default NavbarFunc;
