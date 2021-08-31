import React from "react";
import useWindowSize from "../hooks/useWindowSize";
import "./Footer.css";

function Footer() {
  const windowSize = useWindowSize();
  return (
    // Medium, Narrow or Wide class depending on size
    <div
      id="footer"
      className={`footer ${
        windowSize.width > 600 && windowSize.width < 1100
          ? "med"
          : windowSize.width > 1100
          ? "wide"
          : "narrow"
      }`}
    >
      <FooterCard></FooterCard>
    </div>
  );
}

function FooterCard() {
  const year = new Date().getFullYear();

  return (
    <div>
      {/* robdog copyright */}
      <i
        style={{
          fontSize: "11px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        Robdog © {year}
      </i>
      {/* twitter link */}
      <a href="http://www.twitter.com/mageiden">
        <i className="fab fa-twitter"></i>
      </a>
    </div>
  );
}
export default Footer;
