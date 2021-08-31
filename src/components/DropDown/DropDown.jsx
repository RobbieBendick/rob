import React from "react";
import "./DropDown.css";


function DropDown() {
  return (
    <div className="dropdown">
      <button
        className="dropbtn"
        onClick={() => {
          document.getElementById("myDropdown").classList.toggle("show");
        }}
      >
        <i
          style={{ color: "#fff" }}
          className="fas fa-bars fa-2x ml-4 dropbtn"
        ></i>
      </button>

      <div id="myDropdown" className="dropdown-content">
        <AltDropDownListItem title="3v3" href="#map" />
        <AltDropDownListItem title="2v2" href="#threes-divider" />
        <DropDownListItem title="ArenaMarker" href="#chat" />
        <DropDownListItem title="DarkTheme" href="#raidframes" />
        <DropDownListItem title="Raidframes" href="#footer"/>
      </div>
    </div>
  );
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = (event) => {
  if (!event.target.matches(".dropbtn")) {
    console.log(event.target);
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function AltDropDownListItem({title, href}) {
  return(
  <a href={href} className="dropdown-title">{title}</a>
  )
}

function DropDownListItem({ title, href}) {
  function smoothScroll() {
    document.querySelector(href).scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
  return (
    <>
        <a onClick={smoothScroll} className="dropdown-title">{title}</a>
    </>
  );
}
export default DropDown;
