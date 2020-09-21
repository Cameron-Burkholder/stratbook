/* client/components/partials/teamMember.js */

import React from "react";

/*
  @func: teamMember
  @desc: render team member
  @prop username: String
  @prop attacker_role: String
  @prop defender_role: String
  @prop status: String

*/
const TeamMember = (props) => {
  return (
    <div className="team-member">
      <h4 className="member-username">{props.username}</h4>
      <p className="member-status">{props.status}</p>
      <p className="member-quality">{props.attacker_role}</p>
      <p className="member-quality">{props.defender_role}</p>
    </div>
  )
}

export default TeamMember;
