import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Headerlinks } from "../constant/index";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import userDefault from "../assets/user.png";
const Header = () => {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenProfileMenu = () => {
    setOpenProfileMenu(!openProfileMenu);
  };
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const user = false;
  return (
    <header className="bg-slate-500 py-3">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-wrap items-center justify-between text-white">
        <Link
          to="/"
          className="text-4xl flex items-center font-caveat text-black"
        >
          Alex
          <span className="bg-amber-400 p-[2px] rounded-md flex items-center">
            Blogs
          </span>
        </Link>

        <ul className="justify-center gap-2 items-center hidden sm:flex">
          {Headerlinks.map((link) => (
            <li
              key={link.name}
              className="hover:text-teal-400 transition-colors duration-300 cursor-pointer"
            >
              <Link to={link.to}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center gap-4">
          <div
            onClick={handleOpenProfileMenu}
            className="flex justify-center items-center cursor-pointer gap-2 rounded-xl px-2 py-1 min-w-min relative"
          >
            <div className="flex justify-center items-center gap-4">
              <div className="relative flex justify-center items-center cursor-pointer">
                <img
                  src={
                    user
                      ? "https://randomuser.me/api/portraits/men/5.jpg"
                      : userDefault
                  }
                  alt="profile"
                  width={30}
                  height={30}
                  className="object-cover rounded-full "
                />
                <div
                  className={
                    user
                      ? "w-2 h-2 bg-green-500 rounded-full left-0 top-0 absolute"
                      : "w-2 h-2 bg-gray-400 rounded-full left-0 top-0 absolute"
                  }
                ></div>

                <ChevronDownIcon
                  className={`absolute -bottom-1 -left-0 ${
                    openProfileMenu ? "rotate-180" : ""
                  } transition-transform duration-300`}
                  width={20}
                  height={20}
                />
              </div>

              <div className="text-md sm:text-lg md:text-xl">
                {user ? "Admin" : "Guest"}
              </div>
            </div>

            <div
              className={
                openProfileMenu
                  ? "profile-menu scale-100"
                  : "profile-menu scale-0"
              }
            >
              <div className="flex justify-center items-center gap-2 ">
                <Link to={"/register"}>Register</Link>
                {" | "}
                <Link to={"/login"}>Login</Link>
              </div>
            </div>
          </div>

          <div onClick={handleOpenMenu} className="sm:hidden cursor-pointer">
            <AiOutlineMenu />
          </div>
        </div>
        <div
          className={
            openMenu
              ? "w-full flex flex-col items-center justify-center transition-all duration-500 ease-in-out h-[400px] bg-black bg-opacity-50 absolute top-0 left-0 z-50"
              : "w-full flex flex-col items-center justify-center h-0 transition-all duration-500 ease-in-out bg-black bg-opacity-50 absolute top-0 left-0 z-50"
          }
        >
          <div
            onClick={() => setOpenMenu(false)}
            className={openMenu ? "absolute left-1 top-1 z-[999px]" : "hidden"}
          >
            <AiOutlineClose size={28} />
          </div>

          <ul className={openMenu ? "flex items-center flex-col" : "hidden"}>
            {Headerlinks.map((link) => (
              <li
                key={link.name}
                className="hover:text-teal-400 transition-colors duration-300 cursor-pointer"
              >
                <Link to={link.to}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
