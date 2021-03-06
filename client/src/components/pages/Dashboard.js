/* client/src/components/pages/Dashboard.js */

import React from "react";

import GeneralStatisticsAPI from "../api/GeneralStatisticsAPI.js";
import SeasonalStatisticsAPI from "../api/SeasonalStatisticsAPI.js";
import OperatorStatisticsAPI from "../api/OperatorStatisticsAPI.js";

const Dashboard = (props) => {
  return (
    <div className="page" id="dashboard">
      <h1>Dashboard</h1>
      <GeneralStatisticsAPI getAuthToken={props.getAuthToken} alert={props.alert}/>
      <SeasonalStatisticsAPI getAuthToken={props.getAuthToken} alert={props.alert}/>
      <OperatorStatisticsAPI getAuthToken={props.getAuthToken} alert={props.alert}/>
    </div>
  )
}

export default Dashboard;
