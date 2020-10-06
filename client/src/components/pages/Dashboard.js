/* client/src/components/pages/Dashboard.js */

import React from "react";

import GeneralStatisticsAPI from "../api/GeneralStatisticsAPI.js";
import SeasonalStatisticsAPI from "../api/SeasonalStatisticsAPI.js";
import OperatorStatisticsAPI from "../api/OperatorStatisticsAPI.js";

/*
  @func: Dashboard
  @desc: render dashboard
  @prop getAuthToken: function
  @prop alert: function
*/
const Dashboard = (props) => {
  return (
    <div className="page" id="dashboard">
      <GeneralStatisticsAPI getAuthToken={props.getAuthToken} alert={props.alert}/>
      <SeasonalStatisticsAPI getAuthToken={props.getAuthToken} alert={props.alert}/>
      <OperatorStatisticsAPI getAuthToken={props.getAuthToken} alert={props.alert}/>
    </div>
  )
}

export default Dashboard;
