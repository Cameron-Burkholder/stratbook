/* client/components/pages/ManageTeam.js */

import React from "react";

import UpdateTeamNameAPI from "../api/UpdateTeamNameAPI.js";
import ManageTeamAPI from "../api/ManageTeamAPI.js";
import DeleteTeamAPI from "../api/DeleteTeamAPI.js";

/*
  @func: ManageTeam
  @desc: render manage team page
  @prop getAuthToken: function
*/
const ManageTeam = (props) => {
  return (
    <div className="page" id="manage-team">
      <UpdateTeamNameAPI getAuthToken={props.getAuthToken}/>
      <ManageTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken}/>
      <DeleteTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken}/>
    </div>
  )
}

export default ManageTeam;
