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
        <img className="attacker__image" alt={attacker} src={`../media/min/operators/${attacker.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.png`}/>
      </div>
    )
  });
  const defenders = props.defenders.map((defender, index) => {
    return (
      <div className="defender" key={index}>
        <img className="defender__image" alt={defender} src={`../media/min/operators/${defender.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.png`}/>
      </div>
    )
  });
  return (
    <div className={"team-member" + (props.premium ? " team-member--premium" : "")}>
      <h4 className="team-member__username">{props.username}<em>{props.premium ? "PREMIUM USER" : ""}</em></h4>
      <p className="team-member__status">{props.status}</p>
      <p className="team-member__quality">{props.attacker_role}</p>
      <p className="team-member__quality">{props.defender_role}</p>
      { attackers.length > 0 ? (
        <div className="attackers">
          <p className="team-member__attackers">Preferred Attackers</p>
          { attackers }
        </div>
      ) : "" }
      { defenders.length > 0 ? (
        <div className="defenders">
          <p className="team-member__defenders">Preferred Defenders</p>
          { defenders }
        </div>
      ) : "" }

    </div>
  )
}

export default TeamMember;
