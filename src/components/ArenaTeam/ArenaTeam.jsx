import React from "react";
import "./ArenaTeam.css";
import { motion } from "framer-motion";
import $ from "jquery";

function ArenaTeam({robdog3v3Team, robdog2v2Team, robdog5v5Team, robCharacter}) {

    // removes /"#id" from user's browser
    const removeHash = () => window.history.pushState("", document.title, `${window.location.pathname}${window.location.search}`);
    if (window.location.hash !== "") removeHash();


    // remove arena team categories that dont show up
    $(window).on('load', () => {
        setTimeout(removeLoader, 10*1000); //wait for page load PLUS 10 seconds.
    });
    const removeLoader = () => {
        $( ".loader" ).fadeOut(500, () => {
            // fadeOut complete. Remove the loading div
            $( ".loader" ).remove(); //makes page more lightweight
        });

        // if 2s team doesnt show up
        if (!$("#divider").length > 0) {
            // hide 2v2 team
            $("#twos").fadeOut(500, () => {
                $("#twos").remove();
            });
            // hide sidebar 2v2
            $(".sidebar ul li:contains('2v2')").fadeOut(500, () => {
                $(".sidebar ul li:contains('2v2')").remove();
            });
            // hide mobile sidebar 2v2
            $("#myDropdown > a.dropdown-title:contains('2v2')").fadeOut(500, () => {
                $("#myDropdown > a.dropdown-title:contains('2v2')").remove();
            });
        };

        // if threes team doesnt show up
        if (!$("#threes").length > 0) {
            // hide 3v3 team
            $("#content-seperator").fadeOut(500, () => {
                $("#content-seperator").remove();
            });
            // hide sidebar 3v3
            $(".sidebar ul li:contains('3v3')").fadeOut(500, () => {
                $(".sidebar ul li:contains('3v3')").remove();
            });
            // hide mobile sidebar 3v3
            $("#myDropdown > a.dropdown-title:contains('3v3')").fadeOut(500, () => {
                $("#myDropdown > a.dropdown-title:contains('3v3')").remove();
            });
        };

        // if fives team doesnt show up
        if (!$("#five").length > 0) {
            // hide 5v5 team
            $("#fives").fadeOut(500, () => {
                $("#fives").remove();
            });
            // hide sidebar 5v5
            $(".sidebar ul li:contains('5v5')").fadeOut(500, () => {
                $(".sidebar ul li:contains('5v5')").remove();
            });
            // hide mobile sidebar 5v5
            $("#myDropdown > a.dropdown-title:contains('5v5')").fadeOut(500, () => {
                $("#myDropdown > a.dropdown-title:contains('5v5')").remove();
            });
        };

        // if 2s AND 3s AND 5s teams ALL dont show up
        if (!$("#threes").length > 0 && !$("#divider").length > 0 && !$("#five").length > 0) {
            // move footer to bottom
            setTimeout(() => {
                $("#footer").css("position", "absolute").css("bottom", "14px")
            }, 500);
            setTimeout(() => {
                // if sidebar doesn't have any content
                if ($("ul.rob li").length === 0) {
                    // add 'home' to sidebar
                    var homeSideBarButton = $("<li style='padding-top: 22px' class='sidebar-item'><h5><a href='/' class='nav-link sidebar-title'>Home</a></h5></li>").hide();
                    $("ul.rob").append(homeSideBarButton);
                    homeSideBarButton.fadeIn(500)
                };
                // let user know we couldn't find a team.
                $(".unavailable").fadeIn(500, () => {
                    $(".unavailable").html("Sorry! We could not retrieve an active arena team.").css({paddingTop:"28px",color: "#c9d1d9", fontSize: "35px", textShadow: "0.05em 0 black, 0 0.05em black, -0.05em 0 black, 0 -0.05em black, -0.05em -0.05em black, -0.05em 0.05em black,0.05em -0.05em black, 0.05em 0.05em black"})
                });
            }, 550);
        };
    };

    const ArenaMember = ({name, rating, played, wins, losses, robdog}) => {

        let winLossRatio = played === 0 ? 0 : Math.round(wins / played * 100 * 10) / 10;
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
       <div className="unavailable">
            {!robdog2v2Team ? <div style={{"marginTop": "10rem", "paddingBottom": "2rem"}} className="loader"></div> :
            <section id="2v2">
                <span className="text" style={{"marginTop": "10rem"}}>rank: {robdog2v2Team.rank} (2v2)</span>
                <motion.div className="table-container" id="divider"  initial={{"opacity": 0}} animate={{"opacity":1}} transition={{"duration": 1}}>
                    <table className={`arena-table table-hover`}>
                        <th className="arena-stats tedh">{robdog2v2Team.team.name}</th>
                        <th className="arena-stats tedh">Team Rating: {robdog2v2Team.rating}</th>
                        <th className="arena-stats tedh">W: {robdog2v2Team.season_match_statistics.won}</th>
                        <th className="arena-stats tedh">L: {robdog2v2Team.season_match_statistics.lost}</th>
                        <th className="arena-stats tedh">Total: {robdog2v2Team.season_match_statistics.played}</th>
                        <th className="arena-stats tedh">W/L: {robdog2v2Team.season_match_statistics.played === 0 ? 0 : Math.round(robdog2v2Team.season_match_statistics.won / robdog2v2Team.season_match_statistics.played * 100 * 10) / 10}%</th>
                        <tbody>
                            {robdog2v2Team.team.members.map((member, index) => (
                               <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost} robdog={member.character.name === robCharacter && true}  />
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </section>}
            <hr id="twos"/>
            {!robdog3v3Team ? <div className="loader"></div> : 
            <section id="3v3">
                <span className="text">rank: {robdog3v3Team.rank} (3v3)</span>
                <motion.div initial={{"opacity": 0}} animate={{"opacity":1}} transition={{"duration": 0.8}} className={`table-container`} id="threes">
                    <table className={`arena-table table-hover ${robdog3v3Team.team.members.length >= 4 ? "bigger-table" : ""}`}>
                        <th>{robdog3v3Team.team.name}</th>
                        <th>Team Rating: {robdog3v3Team.rating}</th>
                        <th>W: {robdog3v3Team.season_match_statistics.won}</th>
                        <th>L: {robdog3v3Team.season_match_statistics.lost}</th>
                        <th>Total: {robdog3v3Team.season_match_statistics.played}</th>
                        <th>W/L: {robdog3v3Team.season_match_statistics.played === 0 ? 0 : Math.round(robdog3v3Team.season_match_statistics.won / robdog3v3Team.season_match_statistics.played * 100 * 10) / 10}%</th>
                        <tbody>
                            {robdog3v3Team.team.members.map((member, index) => (
                                <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost} robdog={member.character.name === robCharacter && true}  />
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </section>}
            <hr id="fives"/>
            {!robdog5v5Team ? <div style={{"marginTop": "10rem", "paddingBottom": "2rem"}} className="loader"></div> :
            <section id="5v5">
                <span className="text" style={{"marginTop": "10rem"}}>rank: {robdog5v5Team.rank} (5v5)</span>
                <motion.div className="table-container" id="five" initial={{"opacity": 0}} animate={{"opacity":1}} transition={{"duration": 1}}>
                    <table className="arena-table table-hover">
                        <th className="arena-stats tedh">{robdog5v5Team.team.name}</th>
                        <th className="arena-stats tedh">Team Rating: {robdog5v5Team.rating}</th>
                        <th className="arena-stats tedh">W: {robdog5v5Team.season_match_statistics.won}</th>
                        <th className="arena-stats tedh">L: {robdog5v5Team.season_match_statistics.lost}</th>
                        <th className="arena-stats tedh">Total: {robdog5v5Team.season_match_statistics.played}</th>
                        <th className="arena-stats tedh">W/L: {Math.round(robdog5v5Team.season_match_statistics.won / robdog5v5Team.season_match_statistics.played * 100 * 10) / 10}%</th>
                        <tbody>
                            {robdog5v5Team.team.members.map((member, index) => (
                              <ArenaMember key={index} name={member.character.name} rating={member.rating} played={member.season_match_statistics.played} wins={member.season_match_statistics.won} losses={member.season_match_statistics.lost} robdog={member.character.name === robCharacter && true}  />
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </section>}
        </div>
    )
}

export default ArenaTeam;