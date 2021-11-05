import React, { useEffect, useState } from "react";
import {motion} from "framer-motion";
import "./Cutoffs.css";

function Cutoffs({rankOne, glad, duelist, robTeams}) {
    //robTeams[0] >= rankOne[0] 
    let r1 = false;
    let duel = false;
    let gladiator = false;

    // for(let i = 0; i < 3; i++) {
    //     // robTeams = [2sRating, 3sRating, 5sRating]
    //     // rankOne = [2scutoff, 3scutoff, 5scutoff]
    //     // robTeams[1] >= 2scutoff[1, 2,3?]
    //     for(let j = 0; j < 3; j++){
    //         if( robTeams[i] >= rankOne[j] )
    //     }

    // }

    function CutoffTableRow({title, twos, threes, fives}) {
        let newTitle = title.split(" ")[0].toLowerCase() + "z"
        return(
            <tr className={newTitle}>
                <td>{title}</td>
                <td>{twos}</td>
                <td>{threes}</td>
                <td>{fives}</td>
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