import React, { useEffect, useState } from "react";
import "./Syp.css";
import ArenaTeam from "../ArenaTeam/ArenaTeam";

function Syp() {
    const [wowPlayer3v3Data, setWowPlayer3v3Data] = useState([]);
    const [wowPlayer2v2Data, setWowPlayer2v2Data] = useState([]);
    const [syp3v3Team, setSyp3v3Team] = useState(undefined);
    const [syp2v2Team, setSyp2v2Team] = useState(undefined);
    
    const findSyp3v3 = () => {
      for(let i=0; i < wowPlayer3v3Data.length; i++){
        if (!('members' in wowPlayer3v3Data[i].team)){
          // no "members" key in team array, move onto the next team
          continue;
        }
        for(let j=0; j < wowPlayer3v3Data[i].team.members.length; j++){
          if (wowPlayer3v3Data[i].team.members[j].character.name === "Syp") {
            setSyp3v3Team(wowPlayer3v3Data[i]);
            break;
          }
        }
      }
    }
    const findSyp2v2 = () => {
      for(let i=0; i < wowPlayer2v2Data.length; i++){
        if (!('members' in wowPlayer2v2Data[i].team)){
          // no "members" key in team array, move onto the next team
          continue;
        }
        for(let j=0; j < wowPlayer2v2Data[i].team.members.length; j++){
          if (wowPlayer2v2Data[i].team.members[j].character.name === "Syp") {
            setSyp2v2Team(wowPlayer2v2Data[i]);
            break;
          }
        }
      }
    }
    useEffect(() => {
      let threesUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/1/pvp-leaderboard/3v3?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
      let twosUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/1/pvp-leaderboard/2v2?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
      async function myFetch(url){
        let response = await fetch(url);
        return await response.json();
      }
      if (wowPlayer3v3Data.length === 0) {
        myFetch(threesUrl)
        .then(res => setWowPlayer3v3Data(res.entries));
      }
      if (wowPlayer2v2Data.length === 0) {
        myFetch(twosUrl)
        .then(res => setWowPlayer2v2Data(res.entries));
      }
    }, [wowPlayer3v3Data, wowPlayer2v2Data]); 
  
    useEffect(() => {
      findSyp3v3();
    }, [wowPlayer3v3Data])
  
    useEffect(() => {
      findSyp2v2();
    }, [wowPlayer2v2Data])


    return (
            <div style={{"paddingTop": "10rem"}}>
                <h1 className="rob-addon">Syp's Teams</h1>
                <ArenaTeam robdog2v2Team={syp2v2Team} robdog3v3Team={syp3v3Team} robCharacter="Syp"/>
            </div>
            )
    }

export default Syp