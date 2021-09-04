import React from "react";
import "./Addons.css";
import AddonItem from "../AddonItem/AddonItem";

function Addons() {
    return (
            <>
                <h1 className="rob-addon">Mageiden's Addons</h1>
                <ul>
                <AddonItem
                  addonTitle="ArenaMarker"
                  imgSrc="/images/arenamarker.png"
                  addonSrc="https://www.curseforge.com/wow/addons/arenamarker"
                  addonDescription="Gives you and your party members Raid Target Markers based on their class in arena."
                  key="1"
                  id="rob"
                  alt="addonmarker-img"
                />
                <AddonItem
                  addonTitle="DarkTheme"
                  imgSrc="/images/placeholder.png"
                  addonSrc="https://github.com/RobbieBendick/darktheme"
                  addonDescription="Darkens frames, target/focus/pet portraits, and cleans up clutter from the minimap."
                  key="2"
                  id="raidframes"
                  alt="darktheme-img"
                />
                <AddonItem
                  addonTitle="Raidframes"
                  imgSrc="/images/placeholder.png"
                  addonSrc=""
                  addonDescription="Switches between preset Raid-Frame profiles depending on group size."
                  key="3"
                  id="unitframes"
                  alt="raidframes-img"
                  last={true}
                />
                </ul>
            </>
            )
    }

export default Addons;