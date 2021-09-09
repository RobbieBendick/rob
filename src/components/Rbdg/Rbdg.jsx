import React, {useState, useEffect} from "react";
import ArenaTeam from "../ArenaTeam/ArenaTeam";
import $ from "jquery";
import Copyright from "../Copyright/Copyright"
function Rbdg({character}) {
    const [wowPlayer3v3Data, setWowPlayer3v3Data] = useState([]);
    const [wowPlayer2v2Data, setWowPlayer2v2Data] = useState([]);
    const [rbdg3v3Team, setRbdg3v3Team] = useState(undefined);
    const [rbdg2v2Team, setRbdg2v2Team] = useState(undefined);
    const [userScrollingPosition, setUserScrollingPosition] = useState(undefined);

    let listOfSidebarContent = ["3v3", "2v2"];
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
        if(!entry.isIntersecting) return
        if(!entry.target.id) return
        setUserScrollingPosition(entry.target.id);
        observer.unobserve(entry.target)
      });
    }, options);
  
    sections.forEach(section => {
      observer.observe(section)
    })

    const findRbdg3v3 = () => {
      for(let i=0; i < wowPlayer3v3Data.length; i++){
        if (!('members' in wowPlayer3v3Data[i].team)) continue;
        for(let j=0; j < wowPlayer3v3Data[i].team.members.length; j++){
          if (wowPlayer3v3Data[i].team.members[j].character.name === character) {
            setRbdg3v3Team(wowPlayer3v3Data[i]);
            break;
          }
        }
      }
    }
    const findRbdg2v2 = () => {
      for(let i=0; i < wowPlayer2v2Data.length; i++){
        if (!('members' in wowPlayer2v2Data[i].team)) continue;
        for(let j=0; j < wowPlayer2v2Data[i].team.members.length; j++){
          if (wowPlayer2v2Data[i].team.members[j].character.name === character) {
            setRbdg2v2Team(wowPlayer2v2Data[i]);
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
    }, [])

      useEffect(() => {
        findRbdg3v3();
      }, [wowPlayer3v3Data])

      useEffect(() => {
        findRbdg2v2();
      }, [wowPlayer2v2Data])


    return (
      <div style={{"paddingTop": "5rem"}}>
        <h1 className="rob-addon">{character}'s Active Teams</h1>
        <ArenaTeam robdog2v2Team={rbdg2v2Team} robdog3v3Team={rbdg3v3Team} robCharacter={character}/>
      </div>
    )
}


export default Rbdg;