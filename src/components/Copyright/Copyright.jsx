import React from "react";
import useWindowSize from "../hooks/useWindowSize";
import "./Copyright.css";

function Copyright() {
  const windowSize = useWindowSize();
  return (
    // Medium, Narrow or Wide class depending on size
    <div
      id="footer"
      className={`copyright ${
        windowSize.width > 600 && windowSize.width < 1100
          ? "med"
          : windowSize.width >= 1100
          ? "wide"
          : "narrow"
      }`}
    >
      <CopyrightCard></CopyrightCard>
    </div>
  );
}

function CopyrightCard() {
  const year = new Date().getFullYear();

  return (
    <div>
      <i
        style={{
          fontSize: "11px",
          textAlign: "center",
          marginLeft: "20px",
          color: "#fff",
        }}
      >
        Robdog © {year}
      </i>
      <a
        style={{ paddingLeft: "10px", color: "#fff" }}
        href="http://www.twitter.com/mageiden"
      >
        <i className="fab fa-twitter"></i>
      </a>
    </div>
  );
}
export default Copyright;
