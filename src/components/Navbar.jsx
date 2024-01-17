import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { close, logo, menu } from "../assets";
import { useMediaQuery } from "@material-ui/core";

const Navbar = () => {
  const isMobileScreens = useMediaQuery("(min-width:400px)");
const [toggle,settoggle]=useState(false)
  const [top, setTop] = useState("");
  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 `}
    >
      <div className={`w-full flex ${toggle?"flex-col":"flex-row items-center"} relative justify-between  max-w-3xl mx-auto navblur`}>
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setTop("");
            window.scrollTo(0, 0);
          }}
        >
          {/* <img src={logo} alt="logo" className="w-9 h-9 object-contain" /> */}
          <p className="logofont">
            The<span className="text-blue-500 logofont">creator</span>
            <span className="text-red-400 logofont">07</span>
          </p>
        </Link>
        <ul className={`list-none  sm:flex flex-row gap-10 ${toggle?"":" hidden"}`}>
          {navLinks.map((link) => (
            <li
              className={`${
                top === link.title ? "text-white" : "text-secondary"
              } cursor-pointer hover:text-white text-center`}
              onClick={() => setTop(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="sm:hidden absolute top-2 right-2 flex justify-end items-center">
          <img src={toggle?close:menu} alt="menu" className="w-6 h-6 object-contain cursor-pointer" onClick={()=>settoggle(!toggle)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
