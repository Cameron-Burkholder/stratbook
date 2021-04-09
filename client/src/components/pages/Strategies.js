/* client/src/components/pages/Strategies.js */

import React from "react";

import ViewStrategiesAPI from "../api/ViewStrategiesAPI.js";

const Strategies = (props) => {
  return (
    <div className="page" id="strategies">
      <ViewStrategiesAPI team_code={props.team_code} getAuthToken={props.getAuthToken} alert={props.alert} map={props.map} status={props.status}/>
    </div>
  )
}

export default Strategies;
