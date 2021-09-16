import React, { useEffect, useState } from "react";
import {motion} from "framer-motion";
import "./Cutoffs.css";

function Cutoffs({rankOne, glad, duelist, teamRatings}) {

    function CutoffTableRow({title, twos, threes, fives}) {
        let r1 = false;
        let r1Twos = false;
        let r1Threes = false;
        let r1Fives = false;
        if(title === "Rank One") {
            for (let i = 0; i < rankOne.length; i++) {
                if(teamRatings[i] >= rankOne[i]){
                    r1 = true;
                    if (i === 0) {
                        r1Twos = true;
                    }
                    if (i === 1) {
                        r1Threes = true;
                    }
                    if (i === 2) {
                        r1Fives = true;
                    }
                    
                }
            }
        }
        return(
            <tr>
                <td className={`${r1 && "robdog-border"}`}>{title}</td>
                <td className={`${r1Twos && "robdog-border"}`}>{twos}</td>
                <td className={`${r1Threes && "robdog-border"}`}>{threes}</td>
                <td className={`${r1Fives && "robdog-border"}`}>{fives}</td>
            </tr>
        )
    }
    
    return (

        <motion.div initial={{"opacity":0}} animate={{"opacity": 1}} transition={{"duration": 0.8}}>
            <h3 className="cutoffs">Arena Cutoffs:</h3>
            <table className="cutoff-table table-hover">
                <th>Titles</th>
                <th>2v2</th>
                <th>3v3</th>
                <th>5v5</th>
                <tbody>
                <CutoffTableRow title="Rank One" twos={rankOne[0]} threes={rankOne[1]} fives={rankOne[2]} />
                <CutoffTableRow title="Gladiator" twos={glad[0]} threes={glad[1]} fives={glad[2]} />
                <CutoffTableRow title="Duelist" twos={duelist[0]} threes={duelist[1]} fives={duelist[2]} />
                </tbody>
            </table>
        </motion.div>
    )
}


export default Cutoffs;