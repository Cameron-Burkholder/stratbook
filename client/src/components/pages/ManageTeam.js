/* client/src/components/pages/ManageTeam.js */

import React from "react";

import UpdateTeamNameAPI from "../api/UpdateTeamNameAPI.js";
import ManageTeamAPI from "../api/ManageTeamAPI.js";
import DeleteTeamAPI from "../api/DeleteTeamAPI.js";

/*
  @func: ManageTeam
  @desc: render manage team page
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @prop alert: function
*/
const ManageTeam = (props) => {
  return (
    <div className="page" id="manage-team">
      <UpdateTeamNameAPI getAuthToken={props.getAuthToken}/>
      <ManageTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
      <DeleteTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
    </div>
  )
}

export default ManageTeam;
