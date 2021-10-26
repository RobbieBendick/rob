import React, { useEffect, useState } from "react";
import {motion} from "framer-motion";
import "./Cutoffs.css";

function Cutoffs({rankOne, glad, duelist, teamRatings}) {

    function CutoffTableRow({title, twos, threes, fives}) {
        
        return(
            <tr>
                <td className={``}>{title}</td>
                <td className={``}>{twos}</td>
                <td className={``}>{threes}</td>
                <td className={``}>{fives}</td>
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