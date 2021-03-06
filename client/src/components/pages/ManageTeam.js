/* client/src/components/pages/ManageTeam.js */

import React from "react";

import UpdateTeamNameAPI from "../api/UpdateTeamNameAPI.js";
import TeamAnnouncementAPI from "../api/TeamAnnouncementAPI.js";
import ManageTeamAPI from "../api/ManageTeamAPI.js";
import DeleteTeamAPI from "../api/DeleteTeamAPI.js";
import BlockedUsersAPI from "../api/BlockedUsersAPI.js";
import { Link } from "react-router-dom";

const ManageTeam = (props) => {
  return (
    <div className="page" id="manage-team">
      <h1>Manage Team</h1>
      <Link className="button" to="/team">Back to Team</Link>
      <div id="TeamControls">
        <UpdateTeamNameAPI getAuthToken={props.getAuthToken} alert={props.alert}/>
        <TeamAnnouncementAPI getAuthToken={props.getAuthToken} alert={props.alert}/>
      </div>
      <ManageTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
      <BlockedUsersAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
      <DeleteTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
    </div>
  )
}

export default ManageTeam;
