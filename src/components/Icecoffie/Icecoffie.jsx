import React, { useEffect, useState } from "react";
import "./Icecoffie.css";
import ArenaTeam from "../ArenaTeam/ArenaTeam";
import $ from "jquery";
import Cutoffs from "../Cutoffs/Cutoffs";

function Icecoffie({character}) {
  useEffect(() => {
    document.title = `${character}'s Arena Teams`
  }, [])

  const [wowPlayer2v2Data, setWowPlayer2v2Data] = useState([]);
  const [robdog2v2Team, setRobdog2v2Team] = useState(undefined);
  const [robdog2v2TeamRating, setRobdog2v2TeamRating] = useState(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const [userScrollingPosition, setUserScrollingPosition] = useState(undefined);
  const [endOfSeasonInfo, setEndOfSeasonInfo] = useState(undefined);
  const [rankOneRange, setRankOneRange] = useState(false);

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
    let twosUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/3/pvp-leaderboard/2v2?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
    async function myFetch(url){
      setIsFetching(true);
      let response = await fetch(url);
      return await response.json();
    }
    if (wowPlayer2v2Data.length === 0 && !isFetching) {
      myFetch(twosUrl)
      .then(res => setWowPlayer2v2Data(res.entries))
    }
  }, [wowPlayer2v2Data, isFetching]); 

  useEffect(() => {
    const findRobdog = (table, setTeam, setRating) => {
      for(let i=0; i < table.length; i++){
        if (!('members' in table[i].team)) continue;
        for(let j=0; j < table[i].team.members.length; j++){
          if (table[i].team.members[j].character.name === character) {
            setTeam(table[i]);
            setRating(table[i].rating)
            break;
          }
        }
      }
    }
    findRobdog(wowPlayer2v2Data, setRobdog2v2Team, setRobdog2v2TeamRating);
  }, [wowPlayer2v2Data, character]);

  useEffect(() => {
    async function fetcher() {
      let response = await fetch(`https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/3/pvp-reward/index?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`)
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
  useEffect(() => {
    if (robdog2v2TeamRating) {
        if (robdog2v2TeamRating > duelistCutoffs[0] && robdog2v2TeamRating < rankOneCutoffs[0]) {
            $(".cutoff-table td:contains('Gladiator')").parent().addClass("robdog-border")
        } else if (robdog2v2TeamRating > gladCutoffs[0]) {
            $(".cutoff-table td:contains('Rank One')").parent().addClass("robdog-border")
        } else if (robdog2v2TeamRating < gladCutoffs[0]) {
            $(".cutoff-table td:contains('Duelist')").parent().addClass("robdog-border")
        }
    }
  }, [robdog2v2TeamRating, gladCutoffs, duelistCutoffs, rankOneCutoffs])


  let teamRatings = [robdog2v2Team !== undefined ? robdog2v2Team.rating : ""]
  return (
          <div style={{"paddingTop": "5rem"}}>
            <Cutoffs rankOne={rankOneCutoffs} glad={gladCutoffs} duelist={duelistCutoffs} teamRatings={teamRatings}/>
            <h1 className="rob-addon">{character}'s Active Teams</h1>
            <ArenaTeam robdog2v2Team={robdog2v2Team} robCharacter={character}/>
          </div>
          )
  }

export default Icecoffie;