import React, { useEffect, useState } from "react";
import "./Robdog.css";
import ArenaTeam from "../ArenaTeam/ArenaTeam";
import $ from "jquery";

function Robdog({character}) {
    const [wowPlayer3v3Data, setWowPlayer3v3Data] = useState([]);
    const [wowPlayer2v2Data, setWowPlayer2v2Data] = useState([]);
    const [wowPlayer5v5Data, setWowPlayer5v5Data] = useState([]);
    const [robdog3v3Team, setRobdog3v3Team] = useState(undefined);
    const [robdog2v2Team, setRobdog2v2Team] = useState(undefined);
    const [robdog5v5Team, setRobdog5v5Team] = useState(undefined);
    const [isFetching, setIsFetching] = useState(false);
    // const [userScrollingPosition, setUserScrollingPosition] = useState(undefined);

    // let listOfSidebarContent = ["3v3", "2v2"];
  
    // for(let i=0;i < listOfSidebarContent.length; i++){
    //   if (userScrollingPosition === listOfSidebarContent[i]){
    //     $(`.${listOfSidebarContent[i]}`).addClass("active")
    //   } else {
    //     $(`.${listOfSidebarContent[i]}`).removeClass("active")
    //   }
    // }

    // const options = {
    //   root: null, // it is the viewport
    //   threshold: 0.6,
    //   rootMargin: "-55px"
    // }
    // const sections = document.querySelectorAll("section")
    // const observer = new IntersectionObserver(function (entries, observer) {
    //   entries.forEach(entry => {
    //     if(!entry.isIntersecting) return
    //     if(!entry.target.id) return
    //     setUserScrollingPosition(entry.target.id);
    //     observer.unobserve(entry.target)
    //   });
    // }, options);
  
    // sections.forEach(section => {
    //   observer.observe(section)
    // })

    const findRobdog = (table, setTeam) => {
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
        setIsFetching(true)
        let response = await fetch(url);
        return await response.json();
      }
      if (wowPlayer3v3Data.length === 0 && !isFetching) {
        myFetch(threesUrl)
        .then(res => setWowPlayer3v3Data(res.entries))
      }
      if (wowPlayer2v2Data.length === 0 && !isFetching) {
        myFetch(twosUrl)
        .then(res => setWowPlayer2v2Data(res.entries))
      }
      if (wowPlayer5v5Data.length === 0 && !isFetching) {
        myFetch(fivesUrl)
        .then(res => setWowPlayer5v5Data(res.entries))
      }
    }, [wowPlayer3v3Data, wowPlayer2v2Data, wowPlayer5v5Data]); 
  
    useEffect(() => {
      findRobdog(wowPlayer3v3Data, setRobdog3v3Team);
    }, [wowPlayer3v3Data])
  
    useEffect(() => {
      findRobdog(wowPlayer2v2Data, setRobdog2v2Team);
    }, [wowPlayer2v2Data])

    useEffect(() => {

      findRobdog(wowPlayer5v5Data, setRobdog5v5Team);
    }, [wowPlayer5v5Data])


    return (
            <div style={{"paddingTop": "5rem"}}>
                <h1 className="rob-addon">{character}'s Active Teams</h1>
                <ArenaTeam robdog2v2Team={robdog2v2Team} robdog3v3Team={robdog3v3Team} robdog5v5Team={robdog5v5Team} robCharacter={character}/>
            </div>
            )
    }

export default Robdog;