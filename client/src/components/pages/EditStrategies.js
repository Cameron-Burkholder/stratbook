/* client/src/components/pages/EditStrategies.js */

import React from "react";

import EditStrategiesAPI from "../api/EditStrategiesAPI.js";

/*
  @func: EditStrategies
  @desc: render manage team page
  @prop getAuthToken: function
  @prop alert: function
*/
const EditStrategies = (props) => {
  return (
    <div className="page" id="manage-team">
      <EditStrategiesAPI getAuthToken={props.getAuthToken} alert={props.alert}/>
    </div>
  )
}

export default EditStrategies;
