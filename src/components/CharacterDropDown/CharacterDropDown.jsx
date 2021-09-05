import React from "react";
import "./CharacterDropDown.css";
import $ from "jquery";


function CharacterDropDown() {
  function CharacterListItem({title, href}) {
    return(
    <a href={href} className="dropdown-title">{title}</a>
    )
  }
  

    // Close the dropdown menu if the user clicks outside of it
  

  return (
    <div className="character-dropdown">
      <button
        className="character-dropbtn"
        onClick={() => {
          document.getElementById("myCharacterDropdown").classList.toggle("show");
        }}
      >
       <i class="fas fa-arrow-down">Arena Teams</i>
      </button>

      <div id="myCharacterDropdown" className="character-dropdown-content">
        <>
        <CharacterListItem title="Main Rogue" href="/robdog" />
        <CharacterListItem title="Horde Rogue" href="/soyeonuwu" />
        <CharacterListItem title="Alliance Mage" href="/syp"/>
        <CharacterListItem title="Horde Mage" href="/rbdg" />
        </>
      </div>
    </div>
  );
}

export default CharacterDropDown;