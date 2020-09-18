/* client/components/pages/Strategies.js */

import React from "react";

import ViewStrategiesAPI from "../api/ViewStrategiesAPI.js";

/*
  @func: Strategies
  @desc: render strategies page
  @prop team_code: String
*/
const Strategies = (props) => {
  return (
    <div className="page" id="strategies">
      <ViewStrategiesAPI team_code={props.team_code}/>
    </div>
  )
}

export default Strategies;
