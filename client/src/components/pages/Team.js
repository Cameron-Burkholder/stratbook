/* client/src/components/pages/Team.js */

import React from "react";

import CreateTeamAPI from "../api/CreateTeamAPI.js";
import JoinTeamAPI from "../api/JoinTeamAPI.js";
import ViewTeamAPI from "../api/ViewTeamAPI.js";
import ViewTeamStatisticsAPI from "../api/ViewTeamStatisticsAPI.js";
import LeaveTeamAPI from "../api/LeaveTeamAPI.js";

/*
  @func: Team
  @desc: render team page
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @prop team_code: String
  @prop alert: function
*/
const Team = (props) => {
  return (
    <div className="page" id="team">
      { props.team_code ? (
        <div>
          <ViewTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken}/>
          <ViewTeamStatisticsAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken}/>
          <LeaveTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken}/>
        </div>
      ) : (
        <div>
          <h2>You do not have a team</h2>
          It appears that you do not belong to a team. In order to use all the features of Stratbook, make or join one here.
          <CreateTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} name={props.name}/>
          <JoinTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken}/>
        </div>
      )}
    </div>
  )
}

export default Team;
