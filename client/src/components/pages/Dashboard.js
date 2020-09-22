/* client/components/pages/Dashboard.js */

import React from "react";

import GeneralStatisticsAPI from "../api/GeneralStatisticsAPI.js";

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
    </div>
  )
}

export default Dashboard;
