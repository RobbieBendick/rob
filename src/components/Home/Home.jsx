import React, { useEffect, useState } from "react";
import "./Home.css";
import useWindowSize from "../hooks/useWindowSize";
import $ from "jquery";
import Addons from "../Addons/Addons";

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    document.title = "Mageiden";
  });

  const windowSize = useWindowSize();
  const [userScrollingPosition, setUserScrollingPosition] = useState("ArenaMarker");

  let listOfSidebarContent = ["ArenaMarker", "DarkTheme", "Raidframes"];

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
    rootMargin: "-80px"
  }
  const sections = document.querySelectorAll("section")
  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
        return;
      }
      if (!entry.target.id) {
        return;
      }
      setUserScrollingPosition(entry.target.id);
      observer.unobserve(entry.target)
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section)
  })


  return (
    <>
    {// Medium, Narrow or Wide class depending on size
    <div
      className={`homeView ${
        windowSize.width > 600 && windowSize.width < 1100
          ? "med"
          : windowSize.width <= 600
          ? "narrow"
          : "wide"
      }`}
    >
      <HomeView
       />
    </div>
}
    </>
  );
}

function HomeView({
  wowPlayer3v3Data,
  robdog3v3Team,
  robdog2v2Team}) {

  return (
    <div id="rob" className="pad">
        <Addons />
    </div>
  );
}

export default Home;
