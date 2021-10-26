import React, { useEffect, useState } from "react";
import "./Soyeonuwu.css";
import ArenaTeam from "../ArenaTeam/ArenaTeam";
import $ from "jquery";
import Cutoffs from "../Cutoffs/Cutoffs";

function Soyeonuwu({character}) {

  const [wowPlayer3v3Data, setWowPlayer3v3Data] = useState([]);
  const [wowPlayer2v2Data, setWowPlayer2v2Data] = useState([]);
  const [wowPlayer5v5Data, setWowPlayer5v5Data] = useState([]);
  const [soyeon3v3Team, setSoyeon3v3Team] = useState(undefined);
  const [soyeon2v2Team, setSoyeon2v2Team] = useState(undefined);
  const [soyeon5v5Team, setSoyeon5v5Team] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const [userScrollingPosition, setUserScrollingPosition] = useState(undefined);
  const [endOfSeasonInfo, setEndOfSeasonInfo] = useState(undefined);

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
      observer.unobserve(entry.target);
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  })

  useEffect(() => {
    let threesUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/2/pvp-leaderboard/3v3?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
    let twosUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/2/pvp-leaderboard/2v2?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
    let fivesUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/2/pvp-leaderboard/5v5?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
    async function myFetch(url){
      setIsFetching(true);
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
  }, [wowPlayer3v3Data, wowPlayer2v2Data, wowPlayer5v5Data, isFetching]); 

  useEffect(() => {
    const findSoyeon = (table, setTeam) => {
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
    findSoyeon(wowPlayer2v2Data, setSoyeon2v2Team);
    findSoyeon(wowPlayer3v3Data, setSoyeon3v3Team);
    findSoyeon(wowPlayer5v5Data, setSoyeon5v5Team);
  }, [wowPlayer3v3Data, wowPlayer2v2Data, wowPlayer5v5Data, character]);

  useEffect(() => {
    async function fetcher() {
      let response = await fetch(`https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/2/pvp-reward/index?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`)
      return await response.json()
    }
    if (endOfSeasonInfo === undefined) {
      fetcher()
      .then(res => setEndOfSeasonInfo(res.rewards));
    }
  }, [])
    
  let threesR1Cutoff = endOfSeasonInfo !== undefined && endOfSeasonInfo[5].rating_cutoff;
  let twosR1Cutoff = endOfSeasonInfo !== undefined && endOfSeasonInfo[0].rating_cutoff;
  let fivesR1Cutoff = endOfSeasonInfo !== undefined && endOfSeasonInfo[10].rating_cutoff;
  let rankOneCutoffs = [twosR1Cutoff, threesR1Cutoff, fivesR1Cutoff];

  let threesGladCutoff = endOfSeasonInfo !== undefined && endOfSeasonInfo[6].rating_cutoff;
  let twosGladCutoff = endOfSeasonInfo !== undefined && endOfSeasonInfo[1].rating_cutoff;
  let fivesGladCutoff = endOfSeasonInfo !== undefined && endOfSeasonInfo[11].rating_cutoff;
  let gladCutoffs = [twosGladCutoff, threesGladCutoff, fivesGladCutoff];

  let threesDuelistCutoff = endOfSeasonInfo !== undefined && endOfSeasonInfo[7].rating_cutoff;
  let twosDuelistCutoff = endOfSeasonInfo !== undefined && endOfSeasonInfo[2].rating_cutoff;
  let fivesDuelistCutoff = endOfSeasonInfo !== undefined && endOfSeasonInfo[12].rating_cutoff;
  let duelistCutoffs = [twosDuelistCutoff, threesDuelistCutoff, fivesDuelistCutoff];

  return (
          <div style={{"paddingTop": "5rem"}}>
            <Cutoffs rankOne={rankOneCutoffs} glad={gladCutoffs} duelist={duelistCutoffs}/>
            <h1 className="rob-addon">{character}'s Active Teams</h1>
            <ArenaTeam robdog2v2Team={soyeon2v2Team} robdog3v3Team={soyeon3v3Team} robdog5v5Team={soyeon5v5Team} robCharacter={character}/>
          </div>
          )
  }

export default Soyeonuwu;