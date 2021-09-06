import React, { useState } from "react";
import "./CharacterDropDown.css";
import $ from "jquery";
import useWindowSize from "../hooks/useWindowSize";



function CharacterDropDown({boolean, booleanFunction}) {

    const windowSize = useWindowSize();

  function CharacterListItem({title, href}) {
    let active = window.location.pathname === href && "active-character"
    return(
    <a href={href} className={`dropdown-title ${active}`}>{title}</a>
    )
  }

  $(window).resize(() => {
      windowSize.width >= 1199 &&
          booleanFunction(false)
          setClose(false)
  })

  const [close, setClose] = useState(false);

  

  return (
    <>
    {!close &&
    <div class="character-wrapper">
    {/* <!-- Sidebar --> */}
    <nav id="character-sidebar">
        <div class="sidebar-header">
        <h3>Mageiden's active arena teams</h3>
            
        </div>
        <div className="sidebar-collapse-button">
            <button onClick={() => {
                setClose(true)
                booleanFunction(false)
            }
                }><i class="fas fa-window-close"></i></button>
        </div>
        <div className="character-list">
            <ul class="list-unstyled components">
                <CharacterListItem title="Main Rogue" href="/robdog"/>
                <CharacterListItem title="Horde Rogue" href="/soyeonuwu"/>
                <CharacterListItem title="Alliance mage" href="/syp"/>
                <CharacterListItem title="Horde Mage" href="/rbdg"/>
                <CharacterListItem href="/" title="Home" />

            </ul>
    </div> 
     <div id="content">

</div>
    </nav>
    
</div>
}
</>
  );
}

export default CharacterDropDown;