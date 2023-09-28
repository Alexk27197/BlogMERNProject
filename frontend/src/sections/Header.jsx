import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Headerlinks } from "../constant/index";
import { ChevronDownIcon } from "@heroicons/react/solid";

const Header = () => {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const handleOpenProfileMenu = () => {
    setOpenProfileMenu(!openProfileMenu);
  };
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

        <ul className="flex justify-center gap-2 items-center">
          {Headerlinks.map((link) => (
            <li
              key={link.name}
              className="hover:text-teal-400 transition-colors duration-300 cursor-pointer"
            >
              <Link to={link.to}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div
          onClick={handleOpenProfileMenu}
          className="flex justify-center items-center cursor-pointer gap-2 border-2 border-gray-400 rounded-xl px-2 py-1 min-w-min relative"
        >
          <div className="relative flex justify-center items-center cursor-pointer">
            <img
              src="https://randomuser.me/api/portraits/men/5.jpg"
              alt="profile"
              width={40}
              height={40}
              className="object-cover rounded-full "
            />
            <div className="w-2 h-2 bg-green-500 rounded-full left-0 top-0 absolute"></div>

            <ChevronDownIcon
              className={`absolute -bottom-1 -left-0 ${
                openProfileMenu ? "rotate-180" : ""
              } transition-transform duration-300`}
              width={20}
              height={20}
            />
          </div>

          <div>Admin</div>
          <div
            className={
              openProfileMenu
                ? "profile-menu scale-100"
                : "profile-menu scale-0"
            }
          ></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
