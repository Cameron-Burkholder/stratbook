/* client/src/components/pages/SharedStrategies.js */

import React from "react";

import SharedStrategiesAPI from "../api/SharedStrategiesAPI.js";

const SharedStrategies = (props) => {
  return (
    <div className="page" id="strategies">
      <SharedStrategiesAPI alert={props.alert} shared_key={props.shared_key}/>
    </div>
  )
}

export default SharedStrategies;
