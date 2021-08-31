import React from "react";
import "./ArenaTeam.css";
import { motion } from "framer-motion"

function ArenaTeam({robdog3v3Team, threesTeam, robdog2v2Team, twosTeam}) {
    
    
    const ArenaMember = ({name, rating, played, wins, losses, robdog}) => {
        let winLossRatio = Math.round(wins / played * 100 * 10) / 10;
        return (
            <tr className={ robdog ? "arena-member robdog-border" : "arena-member"}>
                <td className={`arena-stats`} >{name}</td>
                <td className={`arena-stats`}>Rating: {rating}</td>
                <td className={"arena-stats"}>W: {wins}</td>
                <td className={"arena-stats"}>L: {losses}</td>
                <td className={"arena-stats"}>Total: {played}</td>
                <td className={"arena-stats"}>{winLossRatio}%</td>
            </tr>
        )
    }
    return (
       <div>
            {robdog3v3Team === undefined ? <div class="loader"></div> : 
            <motion.div initial={{"opacity": 0}} animate={{"opacity":1}} transition={{"duration": 0.8}} className="table-container" id="threes">
                <span className="text">rank: {threesTeam.rank} (3v3)</span>
                <table className="arena-table">
                    <th>{robdog3v3Team.name}</th>
                    <th>Team Rating: {threesTeam.rating}</th>
                    <th>W: {threesTeam.season_match_statistics.won}</th>
                    <th>L: {threesTeam.season_match_statistics.lost}</th>
                    <th>Total: {threesTeam.season_match_statistics.played}</th>
                    <th>W/L: {Math.round(threesTeam.season_match_statistics.won / threesTeam.season_match_statistics.played * 100 * 10) / 10}%</th>
                    <tbody>
                        {robdog3v3Team.members.map((member, index) => (
                            member.character.name === "Robdog" ?
                             <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost} robdog={true} />
                            :
                            <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost} robdog={false}/> 
                        ))}
                    </tbody>
                </table>
            </motion.div>}
            <hr id="twos"/>
            {robdog2v2Team === undefined ? <div style={{"marginTop": "10rem"}} class="loader"></div> :
            <motion.div className="table-container" id="divider" style={{"marginTop": "10rem"}} initial={{"opacity": 0}} animate={{"opacity":1}} transition={{"duration": 1}}>
                <span className="text">rank: {twosTeam.rank} (2v2)</span>
                <table className="arena-table">
                    <th className="arena-stats tedh">{robdog2v2Team.name}</th>
                    <th className="arena-stats tedh">Team Rating: {twosTeam.rating}</th>
                    <th className="arena-stats tedh">W: {twosTeam.season_match_statistics.won}</th>
                    <th className="arena-stats tedh">L: {twosTeam.season_match_statistics.lost}</th>
                    <th className="arena-stats tedh">Total: {twosTeam.season_match_statistics.played}</th>
                    <th className="arena-stats tedh">W/L: {Math.round(twosTeam.season_match_statistics.won / twosTeam.season_match_statistics.played * 100 * 10) / 10}%</th>
                    <tbody>
                        {robdog2v2Team.members.map((member, index) => (
                            member.character.name === "Robdog" ?
                            <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost} robdog={true} />
                           :
                           <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost} robdog={false}/> 
                        ))}
                    </tbody>
                </table>
            </motion.div>}
        </div>
    )
}


export default ArenaTeam;