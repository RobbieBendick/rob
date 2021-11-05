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
  const [soyeon3v3Rating, setSoyeon3v3Rating] = useState(undefined);
  const [soyeon2v2Rating, setSoyeon2v2Rating] = useState(undefined);
  const [soyeon5v5Rating, setSoyeon5v5Rating] = useState(undefined);;

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
    let twosUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/2/pvp-leaderboard/2v2?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
    let threesUrl = `https://us.api.blizzard.com/data/wow/pvp-region/1/pvp-season/2/pvp-leaderboard/3v3?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.REACT_APP_TOKEN}`;
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
    const findSoyeon = (table, setTeam, setRating) => {
      for(let i=0; i < table.length; i++){
        if (!('members' in table[i].team)) continue;
        for(let j=0; j < table[i].team.members.length; j++){
          if (table[i].team.members[j].character.name === character) {
            setTeam(table[i]);
            setRating(table[i].rating);
            break;
          }
        }
      }
    }
    findSoyeon(wowPlayer2v2Data, setSoyeon2v2Team, setSoyeon2v2Rating);
    findSoyeon(wowPlayer3v3Data, setSoyeon3v3Team, setSoyeon3v3Rating);
    findSoyeon(wowPlayer5v5Data, setSoyeon5v5Team, setSoyeon5v5Rating);
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
  const ratings = (soyeon2v2Rating || soyeon3v3Rating || soyeon5v5Rating) !== undefined ? [soyeon2v2Rating, soyeon3v3Rating, soyeon5v5Rating] : undefined;
  useEffect(() => {
    let border = "border: 2.2px solid #107cad !important"
    let r1 = false;
    if (ratings) {
      if (ratings[0] > duelistCutoffs[0] && ratings[0] < rankOneCutoffs[0]) {
        $(".cutoff-table td:contains('Gladiator')").parent().addClass("robdog-border")
      } else if ((ratings[0] > gladCutoffs[0]) || (ratings[1] > gladCutoffs[1]) || (ratings[2] > gladCutoffs[2])) {
        $(".cutoff-table td:contains('Rank One')").parent().addClass("robdog-border")
        r1 = true;
      } else if (ratings[0] < gladCutoffs[0]) {
        $(".cutoff-table td:contains('Duelist')").parent().addClass("robdog-border")
      }
    if (r1) {
      if(ratings[0] > gladCutoffs[0]) { //2s r1
        //Cutoff Highlight
        $("tr.rankz > td:nth-child(2)").attr("style", border)
        //Table Highlight
        $("#divider > table").attr("style", border)
      } else if (ratings[1] > gladCutoffs[1]){ // 3s r1
        // 3v3 r1 cutoff highlight
        $("tr.rankz > td:nth-child(3)").attr("style", border)
        // 3v3 table highlight
        $("#threes > table").attr("style", border)
    } else if (ratings[2] > gladCutoffs[2]) { // 5s r1
        // 5v5 r1 cutoff highlight
        $("tr.rankz > td:nth-child(4)").attr("style", border)
        // 5v5 table highlight
        $("#five > table").attr("style", border)
    }
  }
}
  }, [ratings, gladCutoffs, duelistCutoffs, rankOneCutoffs])

  return (
          <div style={{"paddingTop": "5rem"}}>
            <Cutoffs rankOne={rankOneCutoffs} glad={gladCutoffs} duelist={duelistCutoffs} robTeam/>
            <h1 className="rob-addon">{character}'s Active Teams</h1>
            <ArenaTeam robdog2v2Team={soyeon2v2Team} robdog3v3Team={soyeon3v3Team} robdog5v5Team={soyeon5v5Team} robCharacter={character}/>
          </div>
          )
  }

export default Soyeonuwu;