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
      <p className="team-member__status"><span>Permissions</span>{props.status}</p>
      <p className="team-member__quality"><span>Attacker Role</span>{props.attacker_role}</p>
      <p className="team-member__quality"><span>Defender Role</span>{props.defender_role}</p>
      { props.stats ? (<p className="team-member-stats__stat"><span>Level</span>{props.stats.level}</p>) : ""}
      { props.stats ? (<p className="team-member-stats__stat"><span>K/D</span>{props.stats.kd}</p>) : ""}
      { props.stats ? (<p className="team-member-stats__stat"><span>W/L</span>{props.stats.wl}</p>) : ""}
      { props.stats ? (<p className="team-member-stats__stat"><span>MMR</span>{props.stats.mmr}</p>) : ""}
      { props.stats ? (<p className="team-member-stats__stat"><span>MMR Change</span>{props.stats.mmrchange}</p>) : ""}

    </div>
  )
}

export default TeamMember;
