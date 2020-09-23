/* client/components/pages/Dashboard.js */

import React from "react";

import GeneralStatisticsAPI from "../api/GeneralStatisticsAPI.js";
import SeasonalStatisticsAPI from "../api/SeasonalStatisticsAPI.js";
import OperatorStatisticsAPI from "../api/OperatorStatisticsAPI.js";

/*
  @func: Dashboard
  @desc: render dashboard
  @prop getAuthToken: function
*/
const Dashboard = (props) => {
  return (
    <div className="page" id="dashboard">
      This is the dashboard page.
      <GeneralStatisticsAPI getAuthToken={props.getAuthToken}/>
      <SeasonalStatisticsAPI getAuthToken={props.getAuthToken}/>
      <OperatorStatisticsAPI getAuthToken={props.getAuthToken}/>
    </div>
  )
}

export default Dashboard;
