import React, {useState, useEffect} from "react";
import ArenaTeam from "../ArenaTeam/ArenaTeam";
import $ from "jquery";
function Soyeonuwu() {
    const [wowPlayer3v3Data, setWowPlayer3v3Data] = useState([]);
    const [wowPlayer2v2Data, setWowPlayer2v2Data] = useState([]);
    const [soyeon3v3Team, setSoyeon3v3Team] = useState(undefined);
    const [soyeon2v2Team, setSoyeon2v2Team] = useState(undefined);

    const [userScrollingPosition, setUserScrollingPosition] = useState(undefined);

    let listOfSidebarContent = ["3v3", "2v2", "ArenaMarker", "DarkTheme", "Raidframes"];
  
    for(let i=0;i < listOfSidebarContent.length; i++){
      if (userScrollingPosition === listOfSidebarContent[i]){
        $(`.${listOfSidebarContent[i]}`).addClass("active")
      } else {
        $(`.${listOfSidebarContent[i]}`).removeClass("active")
      }
    }

    const options = {
      root: null, // it is the viewport
      threshold: 0.6,
      rootMargin: "-55px"
    }
    const sections = document.querySelectorAll("section")
    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(entry => {
        if(!entry.isIntersecting) {
          return;
        }
        setUserScrollingPosition(entry.target.id);
        observer.unobserve(entry.target)
      });
    }, options);
  
    sections.forEach(section => {
      observer.observe(section)
    })
    
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
    }, [])

    const findSoyeon3v3 = () => {
        for(let i=0; i < wowPlayer3v3Data.length; i++){
          if (!('members' in wowPlayer3v3Data[i].team)){
            // no "members" key in team array, move onto the next team
            continue;
          }
          for(let j=0; j < wowPlayer3v3Data[i].team.members.length; j++){
            if (wowPlayer3v3Data[i].team.members[j].character.name === "Soyeonuwu") {
              setSoyeon3v3Team(wowPlayer3v3Data[i]);
              break;
            }
          }
        }
      }
      const findSoyeon2v2 = () => {
        for(let i=0; i < wowPlayer2v2Data.length; i++){
          if (!('members' in wowPlayer2v2Data[i].team)){
            // no "members" key in team array, move onto the next team
            continue;
          }
          for(let j=0; j < wowPlayer2v2Data[i].team.members.length; j++){
            if (wowPlayer2v2Data[i].team.members[j].character.name === "Soyeonuwu") {
              setSoyeon2v2Team(wowPlayer2v2Data[i]);
              break;
            }
          }
        }
      }

      useEffect(() => {
        findSoyeon3v3();
      }, [wowPlayer3v3Data])

      useEffect(() => {
        findSoyeon2v2();
      }, [wowPlayer2v2Data])


    return (
        <div style={{"paddingTop": "10rem"}}>
        <h1 className="rob-addon">Soyeonuwu's Active Teams</h1>
        <ArenaTeam robdog2v2Team={soyeon2v2Team} robdog3v3Team={soyeon3v3Team} robCharacter="Soyeonuwu"/>
    </div>
    )
}


export default Soyeonuwu;