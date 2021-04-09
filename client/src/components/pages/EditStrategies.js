/* client/src/components/pages/EditStrategies.js */

import React from "react";

import EditStrategiesAPI from "../api/EditStrategiesAPI.js";

const EditStrategies = (props) => {
  return (
    <div id="edit-strategies">
      <EditStrategiesAPI getAuthToken={props.getAuthToken} alert={props.alert} map={props.map}/>
    </div>
  )
}

export default EditStrategies;
