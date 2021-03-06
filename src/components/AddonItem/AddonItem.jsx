import React, { useState } from "react";
import "./AddonItem.css";
import SmoothCollapse from "react-smooth-collapse";
import { motion } from "framer-motion";
import $ from "jquery";


function AddonItem({ addonTitle, imgSrc, addonSrc, alt, addonDescription, id, last }) {
  const [toggle, setToggle] = useState(true);
  const hr = id === "rob" ? "chat" : id;
  const buttons = [];
  if (toggle) {
    buttons.push(<i className="fas fa-minus"></i>);
  } else {
    buttons.push(<i className="fas fa-plus"></i>);
  }
  var newAddonTitle = ""
  if (/\s/.test(addonTitle)) {
    // It has any kind of whitespace
    newAddonTitle = addonTitle.split(" ").join("");
  }
  return (
    <>
    <section id={toggle ? newAddonTitle === "" ? addonTitle : newAddonTitle : ""}>
      {!toggle ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <h5 className="addon-title-popup">
            {addonTitle}
          </h5>
          <i
            style={{
              display: "block",
              color: "#c9d1d9",
              fontSize: "10px",
              textShadow: "1.5px 1.5px #0e0e0f",
              marginBottom: "-2px",
            }}
            className="fas fa-arrow-down"
          ></i>
        </motion.div>
      ) : (
        <div>
          <p style={{ visibility: "hidden" }}>placeholder</p>
        </div>
      )}
      <a onClick={() => setToggle(!toggle)} type="button" className="collapsible">
        {buttons}
      </a>
      {toggle ? (
        <SmoothCollapse expanded={true} heightTransition="0.6s ease">
          <motion.div whileHover={{scale: 1.055}} transition={{duration: 0.45}} className="card mb-3">
            <img className="card-img-top" src={imgSrc} alt={alt} />
            <div className="card-body">
              <h2 className="card-title addon-title">{addonTitle}</h2>
              <p className="addon-description">{addonDescription}</p>
              <a target="_blank" rel="noopener noreferrer" href={addonSrc} className="addon-link">Grab the addon!</a>
            </div>
          </motion.div>
          {!last && <hr id={hr} />}
        </SmoothCollapse>
      ) : (
        <SmoothCollapse expanded={false} heightTransition="0.6s ease">
          <div className="card mb-3">
            <img className="card-img-top" src={imgSrc} alt={alt} />
            <div className="card-body">
              <h2 className="card-title addon-title">{addonTitle}</h2>
              <p className="addon-description">{addonDescription}</p>
              <a target="_blank" rel="noopener noreferrer" href={addonSrc} className="addon-link">Grab the addon!</a>
            </div>
          </div>
          {!last && <hr id={hr} />}
        </SmoothCollapse>
      )}
      </section>
    </>
  );
}

export default AddonItem;
