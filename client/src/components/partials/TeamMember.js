/* client/components/partials/teamMember.js */

import React from "react";

/*
  @func: teamMember
  @desc: render team member
  @prop username: String
  @prop attacker_role: String
  @prop attackers: Array
  @prop defender_role: String
  @prop defenders: Array
  @prop status: String

*/
const TeamMember = (props) => {
  const attackers = props.attackers.map((attacker, index) => {
    return (
      <div className="attacker" key={index}>
        <img className="attacker-image" alt={attacker} src={"https://cdn.r6stats.com/badges/" + attacker.toLowerCase() + "_badge.png"}/>
      </div>
    )
  });
  const defenders = props.defenders.map((defender, index) => {
    return (
      <div className="defender" key={index}>
        <img className="defender-image" alt={defender} src={"https://cdn.r6stats.com/badges/" + defender.toLowerCase() + "_badge.png"}/>
      </div>
    )
  });
  return (
    <div className="team-member">
      <h4 className="member-username">{props.username}</h4>
      <p className="member-status">{props.status}</p>
      <p className="member-quality">{props.attacker_role}</p>
      <p className="member-quality">{props.defender_role}</p>
      { attackers.length > 0 ? (
        <div className="attackers">
          <p className="member-attackers">Preferred Attackers</p>
          { attackers }
        </div>
      ) : "" }
      { defenders.length > 0 ? (
        <div className="defenders">
          <p className="member-defenders">Preferred Defenders</p>
          { defenders }
        </div>
      ) : "" }

    </div>
  )
}

export default TeamMember;
