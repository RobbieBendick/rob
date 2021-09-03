import React from "react";
import "./Header.css";
import useWindowSize from "../hooks/useWindowSize";
import DropDown from "../DropDown/DropDown";

function Header() {
  const windowSize = useWindowSize();
  let sypPath = window.location.pathname === "/syp" ? "nav-active" : null;
  // let rbdgPath = window.location.pathname === "/rbdg" ? "nav-active" : null;

  function smoothScroll() {
    window.location.pathname === "/" ? 
    document.querySelector("#root").scrollIntoView({
      behavior: "smooth",
      block: "start",
    }) : window.location.pathname = "/";
  };

  return (
    <div className="navv">
      <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow header">
        {windowSize.width >= 1199 ? (
          <a
            style={{ cursor: "pointer" }}
            className="navbar-brand ml-5"
            onClick={smoothScroll}
          >
            <i className="fas fa-home fa-2x"></i>
          </a>
        ) : (
          <DropDown />
        )}
        <div className="nav-container">
          <h5>
          <a className={`sidebar-title nav-title ${sypPath && "nav-active"}`} href={"/syp"}>Ally Mage (Syp)</a>
          </h5>
          <h5>
          <a className="sidebar-title nav-title" href={"/syp"}>Horde Mage (Rbdg)</a>
          </h5>
        </div>

        <div className="nav-right">
          <ul className="px-3 social">
            <a
              className="social-media-icon"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.twitch.tv/mageiden209"
            >
              <i className="fab fa-twitch"></i>
            </a>
            <a
              className="social-media-icon"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/Mageiden"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
