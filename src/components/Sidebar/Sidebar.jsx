import React from "react";
import "./Sidebar.css";
import useWindowSize from "../hooks/useWindowSize";
import $ from "jquery";

function Sidebar() {
  const windowSize = useWindowSize();
  let home = window.location.pathname === "/" ? true : false;
  return (
    <>
    {windowSize.width >= 1199 && (
    <nav className="navbar-expand-lg d-none d-md-block sidebar list-unstyled">
      <div className="sidebar-sticky sidebar-content">
        <ul className="nav flex-column mb-2 rob lob">
        {home ?
          <>
          <ListItem title="ArenaMarker" href="chat" />
          <ListItem title="DarkTheme" href="raidframes" />
          <ListItem title="Arena Frames" href="footer" />
          </>
          :
          <>
          <AltListItem title="3v3 team" href="App"/>
          <AltListItem title="2v2 team" href="twos"/>
          <AltListItem title="5v5 team" href="fives"/>
          </>}
        </ul>
      </div>
    </nav>
    )}
    </>
  );
}

function AltListItem({ title, href }) {
  var newAddonTitle = ""
  if (/\s/.test(title)) {
    // It has any kind of whitespace
    newAddonTitle = title.split(" ").join("");
  }
  return (
    <li className="sidebar-item">
      <h5 className="sidebar-heading justify-content-between align-items-center mt-4 mb-4">
        <a href={`#${href}`} className={`nav-link sidebar-title ${newAddonTitle !== "" ? newAddonTitle : title}`}>
          {title}
        </a>
      </h5>
    </li>
  );
}

function ListItem({ title, href }) {
  function smoothScroll() {
    document.querySelector(`#${href}`).scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
  var newAddonTitle = ""
  if (/\s/.test(title)) {
    // It has any kind of whitespace
    newAddonTitle = title.split(" ").join("");
  }
  return (
    <li className="sidebar-item">
      <h5 className="sidebar-heading justify-content-between align-items-center mt-4 mb-4">
        <a onClick={smoothScroll} className={`nav-link sidebar-title ${newAddonTitle !== "" ? newAddonTitle : title} ${title === "ArenaMarker" && "active"}`}>
          {title}
        </a>
      </h5>
    </li>
  );
}

export default Sidebar;
