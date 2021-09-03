import React from "react";
import "./ArenaTeam.css";
import { motion } from "framer-motion";
import $ from "jquery";

function ArenaTeam({robdog3v3Team, robdog2v2Team, robCharacter}) {
    
    $(window).on('load', function(){
        setTimeout(removeLoader, 12*1000); //wait for page load PLUS 12 seconds.
    });
    function removeLoader(){
        $( ".loader" ).fadeOut(500, function() {
          // fadeOut complete. Remove the loading div
          $( ".loader" ).remove(); //makes page more lightweight
        });
        if (!$('#divider').length > 0) {
            $( "#twos" ).fadeOut(500, function() {
                // fadeOut complete. Remove the loading div
                $( "#twos" ).remove(); //makes page more lightweight
              });
        }
    }
    
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
            <section id="3v3">
            <motion.div initial={{"opacity": 0}} animate={{"opacity":1}} transition={{"duration": 0.8}} className="table-container" id="threes">
                <span className="text">rank: {robdog3v3Team.rank} (3v3)</span>
                <table className="arena-table">
                    <th>{robdog3v3Team.team.name}</th>
                    <th>Team Rating: {robdog3v3Team.rating}</th>
                    <th>W: {robdog3v3Team.season_match_statistics.won}</th>
                    <th>L: {robdog3v3Team.season_match_statistics.lost}</th>
                    <th>Total: {robdog3v3Team.season_match_statistics.played}</th>
                    <th>W/L: {Math.round(robdog3v3Team.season_match_statistics.won / robdog3v3Team.season_match_statistics.played * 100 * 10) / 10}%</th>
                    <tbody>
                        {robdog3v3Team.team.members.map((member, index) => (
                            member.character.name === robCharacter ?
                             <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost} robdog={true} />
                            :
                            <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost} robdog={false}/> 
                        ))}
                    </tbody>
                </table>
            </motion.div>
            </section>}
            <hr id="twos"/>
            {robdog2v2Team === undefined ? <div style={{"marginTop": "10rem"}} class="loader"></div> :
            <section id="2v2">
           <motion.div className="table-container" id="divider" style={{"marginTop": "10rem"}} initial={{"opacity": 0}} animate={{"opacity":1}} transition={{"duration": 1}}>
                <span className="text">rank: {robdog2v2Team.rank} (2v2)</span>
                <table className="arena-table">
                    <th className="arena-stats tedh">{robdog2v2Team.team.name}</th>
                    <th className="arena-stats tedh">Team Rating: {robdog2v2Team.rating}</th>
                    <th className="arena-stats tedh">W: {robdog2v2Team.season_match_statistics.won}</th>
                    <th className="arena-stats tedh">L: {robdog2v2Team.season_match_statistics.lost}</th>
                    <th className="arena-stats tedh">Total: {robdog2v2Team.season_match_statistics.played}</th>
                    <th className="arena-stats tedh">W/L: {Math.round(robdog2v2Team.season_match_statistics.won / robdog2v2Team.season_match_statistics.played * 100 * 10) / 10}%</th>
                    <tbody>
                        {robdog2v2Team.team.members.map((member, index) => (
                            member.character.name === robCharacter ?
                            <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost} robdog={true} />
                           :
                            <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost}/> 
                        ))}
                    </tbody>
                </table>
            </motion.div>
            </section>}
        </div>
    )
}


export default ArenaTeam;