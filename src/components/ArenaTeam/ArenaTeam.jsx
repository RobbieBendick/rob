import React, { useEffect, useState } from "react";
import "./ArenaTeam.css";

function ArenaTeam({robdog3v3Team, threesTeam, robdog2v2Team, twosTeam}) {
    
    
    const ArenaMember = ({name, rating, played, wins, losses}) => {
        let winLossRatio = Math.round(wins / played * 100 * 10) / 10;
        return (
            <tr className="arena-member">
                <td className="arena-stats">{name}</td>
                <td className="arena-stats">Rating: {rating}</td>
                <td className="arena-stats">W: {wins}</td>
                <td className="arena-stats">L: {losses}</td>
                <td className="arena-stats">Total: {played}</td>
                <td className="arena-stats">{winLossRatio}%</td>
            </tr>
        )
    }
    return (
       <div>
            {robdog3v3Team === undefined ? <div class="loader"></div> : 
            <div className="table-container" id="threes">
                <i className="text">rank: {threesTeam.rank} (3v3)</i>
                <table className="arena-table">
                    <th>{robdog3v3Team.name}</th>
                    <th>Team Rating: {threesTeam.rating}</th>
                    <th>W: {threesTeam.season_match_statistics.won}</th>
                    <th>L: {threesTeam.season_match_statistics.lost}</th>
                    <th>Total: {threesTeam.season_match_statistics.played}</th>
                    <th>W/L: {Math.round(threesTeam.season_match_statistics.won / threesTeam.season_match_statistics.played * 100 * 10) / 10}%</th>
                    <tbody>
                        {robdog3v3Team.members.map((member, index) => (
                            <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost}/> 
                        ))}
                    </tbody>
                </table>
            </div>}
            <hr id="threes-divider"/>
            {robdog2v2Team === undefined ? <div style={{"marginTop": "10rem"}} class="loader"></div> :
            <div className="table-container" id="twos" style={{"marginTop": "10rem"}}>
                <i className="text">rank: {twosTeam.rank} (2v2)</i>
                <table className="arena-table">
                    <th>{robdog2v2Team.name}</th>
                    <th>Team Rating: {twosTeam.rating}</th>
                    <th>W: {twosTeam.season_match_statistics.won}</th>
                    <th>L: {twosTeam.season_match_statistics.lost}</th>
                    <th>Total: {twosTeam.season_match_statistics.played}</th>
                    <th>W/L: {Math.round(twosTeam.season_match_statistics.won / twosTeam.season_match_statistics.played * 100 * 10) / 10}%</th>
                    <tbody>
                        {robdog2v2Team.members.map((member, index) => (
                            <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost}/> 
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>
    )
}


export default ArenaTeam;