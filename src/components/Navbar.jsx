import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, logOutUser } = useUserContext();

  const handleLogOut = async () => {
    try {
      await logOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  const classButtonBlue =
    "text-xs md:text-lg text-white bg-blue-700 md:mx-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const classButtonRed =
    "text-xs md:text-lg text-white bg-red-700 md:mx-2 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";

  return (
    <nav className="bg-white px-2  sm:px-4 py-2.5 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link className="flex items-center" to={"/"}>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            MyLink App
          </span>
        </Link>
        <div className="flex md:order-2">
          {user ? (
            <>
              <NavLink to={"/"} className={classButtonBlue}>
                Home
              </NavLink>
              <button onClick={handleLogOut} className={classButtonRed}>
                LogOut
              </button>
            </>
          ) : (
            <>
              <NavLink to={"/login"} className={classButtonBlue}>
                Login
              </NavLink>
              <NavLink to={"/register"} className={classButtonBlue}>
                Sign In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
