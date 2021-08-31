import React from "react";
import "./Sidebar.css";
import useWindowSize from "../hooks/useWindowSize";

function Sidebar() {
  const windowSize = useWindowSize();
  return (
    <>
    {windowSize.width >= 1199 && (
    <nav className="navbar-expand-lg d-none d-md-block sidebar list-unstyled">
      <div className="sidebar-sticky sidebar-content">
        <ul className="nav flex-column mb-2 rob">
          <AltListItem title="3v3 team" href="rob"/>
          <AltListItem title="2v2 team" href="twos"/>
          <ListItem title="ArenaMarker" href="chat" />
          <ListItem title="DarkTheme" href="raidframes" />
          <ListItem title="Raidframes" href="footer" />
        </ul>
      </div>
    </nav>
    )}
    </>
  );
}

function AltListItem({ title, href }) {
  return (
    <li className="sidebar-item">
      <h5 className="sidebar-heading justify-content-between align-items-center mt-4 mb-4">
        <a href={"#"+href} className={`nav-link sidebar-title ${title}`}>
          {title}
        </a>
      </h5>
    </li>
  );
}

function ListItem({ title, href }) {
  function smoothScroll() {
    document.querySelector("#" + href).scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
  return (
    <li className="sidebar-item">
      <h5 className="sidebar-heading justify-content-between align-items-center mt-4 mb-4">
        <a onClick={smoothScroll} className={`nav-link sidebar-title ${title}`}>
          {title}
        </a>
      </h5>
    </li>
  );
}

export default Sidebar;
