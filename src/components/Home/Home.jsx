import React, { useEffect, useState } from "react";
import "./Home.css";
import AddonItem from "../AddonItem/AddonItem";
import useWindowSize from "../hooks/useWindowSize";
import ArenaTeam from "../ArenaTeam/ArenaTeam";
function Home() {
  const windowSize = useWindowSize();

  useEffect(() => {
    document.title = "Mageiden";
  });

  const [wowPlayer3v3Data, setWowPlayer3v3Data] = useState([]);
  const [wowPlayer2v2Data, setWowPlayer2v2Data] = useState([]);
  const [robdog3v3Team, setRobdog3v3Team] = useState(undefined);
  const [robdog2v2Team, setRobdog2v2Team] = useState(undefined);
  const [threesTeam, setThreesTeam] = useState(undefined);
  const [twosTeam, setTwosTeam] = useState(undefined);
  
  const findRobdog3v3 = () => {
    for(let i=0; i < wowPlayer3v3Data.length; i++){
      if (!('members' in wowPlayer3v3Data[i].team)){
        // no "members" key in team array, move onto the next team
        i++;
        continue;
      }
      for(let j=0; j < wowPlayer3v3Data[i].team.members.length; j++){
        if (!wowPlayer3v3Data[i].team.members[j].character.name.search("Robdog")) {
          setRobdog3v3Team(wowPlayer3v3Data[i].team);
          setThreesTeam(wowPlayer3v3Data[i]);
          break;
        }
      }
    }
  }
  const findRobdog2v2 = () => {
    for(let i=0; i < wowPlayer2v2Data.length; i++){
      if (!('members' in wowPlayer2v2Data[i].team)){
        // no "members" key in team array, move onto the next team
        i++;
        continue;
      }
      for(let j=0; j < wowPlayer2v2Data[i].team.members.length; j++){
        if (!wowPlayer2v2Data[i].team.members[j].character.name.search("Robdog")) {
          setRobdog2v2Team(wowPlayer2v2Data[i].team);
          setTwosTeam(wowPlayer2v2Data[i]);
          break;
        }
      }
    }
  }
  useEffect(() => {
    let threes = `https://us.api.blizzard.com/data/wow/pvp-season/1/pvp-leaderboard/3v3?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
    let twos = `https://us.api.blizzard.com/data/wow/pvp-season/1/pvp-leaderboard/2v2?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
    async function myFetch(url){
      let response = await fetch(url);
      return await response.json();
    }
    if (wowPlayer3v3Data.length === 0) {
      myFetch(threes)
      .then(res => setWowPlayer3v3Data(res.entries.slice(0,20)));
    }
    if (wowPlayer2v2Data.length === 0) {
      myFetch(twos)
      .then(res => setWowPlayer2v2Data(res.entries.slice(0,300)));
    }
  }, [wowPlayer3v3Data, wowPlayer2v2Data]); 

  useEffect(() => {
    findRobdog3v3();
  }, [wowPlayer3v3Data])

  useEffect(() => {
    findRobdog2v2();
  }, [wowPlayer2v2Data])
  return (
    // Medium, Narrow or Wide class depending on size
    <div
      className={`homeView ${
        windowSize.width > 600 && windowSize.width < 1100
          ? "med"
          : windowSize.width <= 600
          ? "narrow"
          : "wide"
      }`}
    >
      <HomeView wowPlayer3v3Data={wowPlayer3v3Data} 
      robdog3v3Team={robdog3v3Team} 
      threesTeam={threesTeam} 
      robdog2v2Team={robdog2v2Team} 
      twosTeam={twosTeam} />
    </div>
  );
}

function HomeView({
  wowPlayer3v3Data,
  robdog3v3Team,
  threesTeam, 
  robdog2v2Team, 
  twosTeam}) {

  return (
    <div id="rob" className="pad">
      
      <div className="robdog">
        Mageiden's Active Teams
      </div>
      
        <ArenaTeam wowPlayer3v3Data={wowPlayer3v3Data} 
        robdog3v3Team={robdog3v3Team} 
        threesTeam={threesTeam} 
        robdog2v2Team={robdog2v2Team}
        twosTeam={twosTeam}
        
        />

      <hr id="content-seperator"/>

      <h1 className="rob-addon">
        Mageiden's Addons
      </h1>
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
      {/* background img */}
      <img
        className="background-img"
        src="/images/wes.jpg"
        alt="backround-img"
      ></img>
    </div>
  );
}

export default Home;
