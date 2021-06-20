import React from "react";

import ViewSharedStrategiesAPI from "../api/ViewSharedStrategiesAPI.js";

const Community = (props) => {
  return (
    <div className="page" id="community">
      <h1>Community</h1>
      <ViewSharedStrategiesAPI alert={props.alert}/>
    </div>
  )
}

export default Community;
