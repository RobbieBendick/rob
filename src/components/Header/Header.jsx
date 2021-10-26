import React, {useState} from "react";
import "./Header.css";
import useWindowSize from "../hooks/useWindowSize";
import DropDown from "../DropDown/DropDown";
import CharacterDropDown from "../CharacterDropDown/CharacterDropDown";
import $ from "jquery";
import Sidebar from "../Sidebar/Sidebar";
import { Nav } from "react-bootstrap";

function Header() {
  const windowSize = useWindowSize();
  const [sideBar, setSidebar] = useState(false);


  function smoothScroll() {
    window.location.pathname === "/" ? 
    document.querySelector("#root").scrollIntoView({
      behavior: "smooth",
      block: "start",
    }) : window.location.pathname = "/";
  };

  function NavListItem({href, title}) {
    return (
      <h5>
        <a className={`sidebar-title nav-title ${window.location.pathname === href && "nav-active"}`} href={href}>{title}</a>
      </h5>
    )
  }

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
       {windowSize.width >= 1199 ?
        <div className="nav-container">
          {/* <NavListItem href="/robdog" title="Main Rogue"/> */}
          <NavListItem href="/soyeonuwu" title="Horde Rogue"/>
          {/* <NavListItem href="/syp" title="Alliance Mage"/>
          <NavListItem href="/rbdg" title="Horde Mage"/> */}
        </div>
        :
        !sideBar &&
        <button className="arena-team-button" onClick={() => setSidebar(!sideBar)}>
        Arena Teams 
        <i style={{"paddingLeft": "6px"}} class="fas fa-arrow-left"></i>
      </button>
  }
        {sideBar &&
          <CharacterDropDown boolean={sideBar} booleanFunction={setSidebar}/>
        }
        <div className="social-container">
          <ul className="social">
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
