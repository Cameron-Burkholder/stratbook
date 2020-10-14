/* client/src/components/pages/Strategies.js */

import React from "react";

import ViewStrategiesAPI from "../api/ViewStrategiesAPI.js";

/*
  @func: Strategies
  @desc: render strategies page
  @prop team_code: String
  @prop getAuthToken: function
  @prop alert: function
*/
const Strategies = (props) => {
  return (
    <div className="page" id="strategies">
      <ViewStrategiesAPI team_code={props.team_code} getAuthToken={props.getAuthToken} alert={props.alert}/>
    </div>
  )
}

export default Strategies;
