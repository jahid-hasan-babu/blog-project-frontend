import Link from "next/link";
import { IoMoonSharp, IoSearchSharp } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { LuSun } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import useFetchData from "@/hooks/useFetchData";

export default function Header() {
  // Search bar open and close state
  const [searchOpen, setSearchOpen] = useState(false);

  const inputRef = useRef(null);

  // Clear input field
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchQuery("");
    }
  };

  // Toggle search bar visibility
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  // Close search bar
  const closeSearch = () => {
    setSearchOpen(false);
  };

  // Aside bar for mobile devices
  const [aside, setAside] = useState(false);

  const toggleAside = () => {
    setAside(!aside);
  };

  const handleLinkClick = () => {
    setAside(false);
  };

  // Dark mode state and functionality
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isSystemDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDarkMode =
      isSystemDarkMode || localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fetching and filtering data
  const [alldata, loading] = useFetchData("/api/getblog");

  // Ensure alldata is an array
  const publishedBlogs = Array.isArray(alldata)
    ? alldata.filter((blog) => blog.status === "publish")
    : [];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs =
    searchQuery.trim() === ""
      ? publishedBlogs
      : publishedBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

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
              onClick={toggleSearch}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Discover news, articles and more"
              ref={inputRef}
            />
            <FaXmark onClick={clearInput} style={{ cursor: "pointer" }} />
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
              <button onClick={toggleSearch}>
                <IoSearchSharp />
              </button>
              <button onClick={toggleAside}>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Discover news, articles and more"
              ref={inputRef}
            />
            <FaXmark onClick={clearInput} style={{ cursor: "pointer" }} />
          </div>
          <div className="search_data text-center">
            {loading ? (
              <div className="wh_100 flex flex-center mt-2 pb-5">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {searchQuery ? (
                  <>
                    {filteredBlogs.slice(0, 3).map((blog) => {
                      return (
                        <div className="blog" key={blog._id}>
                          <div className="bloginfo">
                            <Link href={`/blog/${blog.slug}`}>
                              <h3>{blog.slug}</h3>
                            </Link>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Similique modi inventore voluptas in
                              expedita nesciunt obcaecati, ex fuga fugit harum?
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div>No Search Result</div>
                )}
              </>
            )}
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
            <button onClick={toggleAside}>
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
