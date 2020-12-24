/* client/src/components/pages/Team.js */

import React from "react";

import CreateTeamAPI from "../api/CreateTeamAPI.js";
import JoinTeamAPI from "../api/JoinTeamAPI.js";
import ViewTeamAPI from "../api/ViewTeamAPI.js";
import ViewTeamStatisticsAPI from "../api/ViewTeamStatisticsAPI.js";
import LeaveTeamAPI from "../api/LeaveTeamAPI.js";
import { Link } from "react-router-dom";

/*
  @func: Team
  @desc: render team page
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @prop team_code: String
  @prop alert: function
  @prop status: String
*/
const Team = (props) => {
  return (
    <div className="page" id="team">
      <h1>Team</h1>
      { props.team_code ? (
        <div className="hasTeam">
          { props.status === "ADMIN" ? (
            <Link className="button" to="/team/manage">Manage Team</Link>
          ) : ""}
          <ViewTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
          <ViewTeamStatisticsAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
          <LeaveTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
        </div>
      ) : (
        <div className="hasNoTeam">
          <h2>You do not have a team</h2>
          <p>It appears that you do not belong to a team. In order to use all the features of Stratbook, make or join one here.</p>
          <div className="team-grid">
            <CreateTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} name={props.name} alert={props.alert}/>
            <JoinTeamAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Team;
