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
      <h4 className="member-username">{props.username}</h4>
      <p className="member-stat">{props.kd} KD</p>
      <p className="member-stat">{props.wl} WL</p>
      <p className="member-stat">{props.mmr} MMR</p>
      <p className="member-stat">{props.mmrchange} MMR Change</p>
      <p className="member-stat">Level {props.level}</p>
    </div>
  )
}

export default TeamMemberStats;
