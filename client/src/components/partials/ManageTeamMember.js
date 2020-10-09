/* client/src/components/partials/ManageTeamMember.js */

import React from "react";

/*
  @func ManageTeamMember
  @desc manage state of team member on roster

  @prop username: String
  @prop status: String
  @prop updateUserStatus: function
  @prop blockUser: function

*/

const ManageTeamMember = (props) => {
  return (
    <div className="manage-team-member">
      <h4 className="manage-team-member__username">{props.username}</h4>
      { props.status === "ADMIN" ? (
        <p className="manage-team-member__status">{props.status}</p>
      ) : (
        <select className="manage-team-member__input" onChange={(e) => { props.updateUserStatus(props.username, e.target.value) }}>
          <option>MEMBER</option>
          <option>EDITOR</option>
          <option>ADMIN</option>
        </select>
      )}
      { props.status === "ADMIN" ? ("") : (
        <button onClick={() => { props.blockUser(props.username) }} className="manage-team-member__button">Block User</button>
      )}
    </div>
  )
}

export default ManageTeamMember;
