import React, { useEffect, useState } from "react";
import "./Syp.css";
import ArenaTeam from "../ArenaTeam/ArenaTeam";
import $ from "jquery";

function Syp({character}) {
    const [wowPlayer3v3Data, setWowPlayer3v3Data] = useState([]);
    const [wowPlayer2v2Data, setWowPlayer2v2Data] = useState([]);
    const [wowPlayer5v5Data, setWowPlayer5v5Data] = useState([]);
    const [syp3v3Team, setSyp3v3Team] = useState(undefined);
    const [syp2v2Team, setSyp2v2Team] = useState(undefined);
    const [syp5v5Team, setSyp5v5Team] = useState(undefined);
    const [userScrollingPosition, setUserScrollingPosition] = useState(undefined);

    let listOfSidebarContent = ["3v3", "2v2", "5v5"];
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
  
    const findSyp = (table, setTeam) => {
      for(let i=0; i < table.length; i++){
        if (!('members' in table[i].team)) continue;
        for(let j=0; j < table[i].team.members.length; j++){
          if (table[i].team.members[j].character.name === character) {
            setTeam(table[i]);
            break;
          }
        }
      }
    }
    useEffect(() => {
      let threesUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/1/pvp-leaderboard/3v3?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
      let twosUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/1/pvp-leaderboard/2v2?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
      let fivesUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/1/pvp-leaderboard/5v5?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
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
      if (wowPlayer5v5Data.length === 0) {
        myFetch(fivesUrl)
        .then(res => setWowPlayer5v5Data(res.entries));
      }
    }, [wowPlayer3v3Data, wowPlayer2v2Data, wowPlayer5v5Data]); 
  
    useEffect(() => {
      findSyp(wowPlayer3v3Data, setSyp3v3Team);
    }, [wowPlayer3v3Data])
  
    useEffect(() => {
      findSyp(wowPlayer2v2Data, setSyp2v2Team);
    }, [wowPlayer2v2Data])

    useEffect(() => {
      findSyp(wowPlayer5v5Data, setSyp5v5Team);
    }, [wowPlayer5v5Data])


    return (
            <div style={{"paddingTop": "5rem"}}>
                <h1 className="rob-addon">{character}'s Active Teams</h1>
                <ArenaTeam robdog2v2Team={syp2v2Team} robdog3v3Team={syp3v3Team} robdog5v5Team={syp5v5Team} robCharacter={character}/>
            </div>
            )
    }

export default Syp