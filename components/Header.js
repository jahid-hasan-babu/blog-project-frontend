import Link from "next/link";
import { IoMoonSharp, IoSearch, IoSearchSharp } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { LuSun } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  //searchbar open and close function
  const [searchOpen, setSearchOpen] = useState(false);

  const inputRef = useRef(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  //for open searchbar
  const openSearch = () => {
    setSearchOpen(!searchOpen);
  };

  //for close searchbar
  const closeSearch = () => {
    setSearchOpen(false);
  };

  //aside bar for mobile device
  const [aside, setAside] = useState(false);

  const asideOpen = () => {
    setAside(true);
  };
  const asideClose = () => {
    setAside(false);
  };

  const handleLinkClick = () => {
    setAside(false);
  };

  //dark mode

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className="header_sec">
        <div className="container header">
          <div className="logo">
            <Link href="/">
              <h1>JBVLOGS</h1>
            </Link>
          </div>
          <div className="searchbar">
            <IoSearchSharp />
            <input
              onClick={openSearch}
              type="search"
              placeholder="Discover news, articles and more"
            />
          </div>
          <div className="nav_list_dark">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/">About Me</Link>
              </li>
              <li>
                <Link href="/">Contact</Link>
              </li>
            </ul>
            <div className="navlist_mobile_ul">
              <button onClick={toggleDarkMode}>
                {darkMode ? <IoMoonSharp /> : <LuSun />}
              </button>
              <button onClick={openSearch}>
                <IoSearch />
              </button>
              <button onClick={asideOpen}>
                <HiBars3BottomRight />
              </button>
            </div>
            <div className="darkmode">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <span className="slider_header"></span>
              </label>
            </div>
          </div>
        </div>
        <div className={`search_click ${searchOpen ? "open" : ""}`}>
          <div className="searchab_input">
            <IoSearchSharp />
            <input
              type="search"
              placeholder="Discover news, articles and more"
              ref={inputRef}
            />
            <FaXmark onClick={clearInput} style={{ cursor: "pointer" }} />
          </div>
          <div className="search_data text-center">
            <div className="blog">
              <h3>Search data</h3>
            </div>
          </div>
          <div className="exit_search" onClick={closeSearch}>
            <div>
              <FaXmark />
            </div>
            <h4>ESC</h4>
          </div>
        </div>
        <div className={aside ? "navlist_mobile open" : "navlist_mobile"}>
          <div className="navlist_m_title flex flex-sb">
            <h1>JBBLOGS</h1>
            <button onClick={asideClose}>
              <FaXmark />
            </button>
          </div>
          <hr />
          <h3 className="mt-3">Main Menu</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">About Me</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
          <hr />
          <h3 className="mt-3">Topics</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link href="/topics/htmlcssjs">Html Css Js</Link>
            </li>
            <li>
              <Link href="/topics/nextjs">Next JS</Link>
            </li>
            <li>
              <Link href="/topics/database">Database</Link>
            </li>
            <li>
              <Link href="/topics/deployment">Deployment</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
