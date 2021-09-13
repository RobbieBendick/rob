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
                  imgSrc="/images/abcde.png"
                  addonSrc="https://github.com/RobbieBendick/darktheme"
                  addonDescription="Darkens frames, target/focus/pet portraits, and cleans up minimap clutter."
                  key="2"
                  id="raidframes"
                  alt="darktheme-img"
                />
                <AddonItem
                  addonTitle="Arena Frames"
                  imgSrc="/images/gladdy.png"
                  addonSrc="https://www.curseforge.com/wow/addons/gladdy-tbc"
                  addonDescription="Customizable arena frames with cooldown and DR trackers."
                  key="3"
                  id="unitframes"
                  alt="gladdy-img"
                  last={true}
                />
                </ul>
            </>
            )
    }

export default Addons;