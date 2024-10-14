import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { storToken, storUserData } from "../../../redux/features/authSlice";
import { signUpFnProvider } from "../../../Fairbase/firebaseUtils";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const logOutFn = async () => {
    await signUpFnProvider.logOutUser();
    dispatch(storUserData(null));
    dispatch(storToken(null));
  };
  // const user = false;
  const navItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      {user && (
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
      )}
      <li>
        <Link to={"/blog"}>Blogs</Link>
      </li>
      {user?.id ? (
        <li>
          <button onClick={logOutFn}>Logout</button>
        </li>
      ) : (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar justify-around bg-base-200">
      <div className="navbar-start w-1/4">
        <div
          className={`${
            location.pathname.includes("dashboard") ? "" : "hidden"
          }`}
        >
          <label
            htmlFor="dashboard-drawer"
            tabIndex={2}
            className="btn btn-ghost lg:hidden"
          >
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          <img
            className="h-16 w-20"
            src="https://i.ibb.co/RQ5LjS6/M-1-removebg-preview.png"
            alt=""
          />
        </Link>
      </div>
      {!user && (
        <div className="navbar-center hidden lg:flex z-50">
          <ul className="menu menu-horizontal mx-5 p-0 z-50">{navItems}</ul>
        </div>
      )}
      {user && (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user?.userImg} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
