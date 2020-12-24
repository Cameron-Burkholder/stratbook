/* client/components/partials/TeamMemberStats.js */

import React from "react";

/*
  @func: TeamMemberStats
  @desc: render team member statistics
  @prop username: String
  @prop kd: Float
  @prop wl: Float
  @prop mmr: Int
  @prop mmrchange: Int
  @prop level: Int

*/
const TeamMemberStats = (props) => {
  return (
    <div className="team-member-stats">
      <h4 className="team-member-stats__username">{props.username}</h4>
      <p className="team-member-stats__stat">{props.mmr} MMR</p>
      <p className="team-member-stats__stat">{props.kd} K/D</p>
      <p className="team-member-stats__stat">Level {props.level}</p>
      <p className="team-member-stats__stat">+/-{props.mmrchange} MMR</p>
      <p className="team-member-stats__stat">{props.wl} W/L</p>
    </div>
  )
}

export default TeamMemberStats;
