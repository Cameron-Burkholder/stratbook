/* client/src/components/pages/ManageTeam.js */

import React from "react";

import UpdateTeamNameAPI from "../api/UpdateTeamNameAPI.js";
import ManageTeamAPI from "../api/ManageTeamAPI.js";
import DeleteTeamAPI from "../api/DeleteTeamAPI.js";
import BlockedUsersAPI from "../api/BlockedUsersAPI.js";
import { Link } from "react-router-dom";

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
      <Link className="button" to="/team">Back to Team</Link>
      <UpdateTeamNameAPI getAuthToken={props.getAuthToken} alert={props.alert}/>
      <ManageTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
      <BlockedUsersAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
      <div></div><div></div>
      <DeleteTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
    </div>
  )
}

export default ManageTeam;
