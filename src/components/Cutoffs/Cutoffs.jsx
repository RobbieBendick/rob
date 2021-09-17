import React, { useEffect, useState } from "react";
import {motion} from "framer-motion";
import "./Cutoffs.css";

function Cutoffs({rankOne, glad, duelist, teamRatings}) {

    function CutoffTableRow({title, twos, threes, fives}) {
        var titles = {
            "rankOne": {
                "r1": false,
                "r1Twos": false,
                "r1Threes": false,
                "r1Fives": false,
            },
            "gladiator": {
                "gladiator": false,
                "gladiatorTwos": false,
                "gladiatorThrees": false,
                "gladiatorFives": false,
            },
            "duelist": {
                "duel": false,
                "duelTwos": false,
                "duelThrees": false,
                "duelFives": false,
            }
            
        }
        var {r1, r1Twos, r1Threes, r1Fives} = titles.rankOne;
        var {gladiator, gladiatorTwos, gladiatorThrees, gladiatorFives} = titles.gladiator;
        var {duel, duelTwos, duelThrees, duelFives} = titles.duelist;

        if(title === "Rank One") {
            for (let i = 0; i < rankOne.length; i++) {
                if(teamRatings[i] >= rankOne[i]){
                    r1 = true;
                    if (i === 0) r1Twos = true;
                    if (i === 1) r1Threes = true;
                    if (i === 2) r1Fives = true;
                }
            }
        }
        return(
            <tr>
                <td className={`${r1 || gladiator || duel ? "robdog-border" : ""}`}>{title}</td>
                <td className={`${r1Twos || gladiatorTwos || duelTwos ? "robdog-border" : ""}`}>{twos}</td>
                <td className={`${r1Threes || gladiatorThrees || duelThrees ? "robdog-border" : ""}`}>{threes}</td>
                <td className={`${r1Fives || gladiatorFives || duelFives ? "robdog-border" : ""}`}>{fives}</td>
            </tr>
        )
    }
    
    return (

        <motion.div initial={{"opacity":0}} animate={{"opacity": 1}} transition={{"duration": 0.8}}>
            <h3 className="cutoffs">Arena Cutoffs:</h3>
            <div className="arena-cutoff-table-container">
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
            </div>
        </motion.div>
    )
}


export default Cutoffs;