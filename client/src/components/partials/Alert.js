/* client/src/components/partials/Alert.js */

import React from "react";

/*
  @prop index: Int
  @prop message: String
  @prop status: String
  @prop clearAlert: function
*/

const Alert = (props) => {
  return (
    <div className={"alert" + (props.status === "ERROR" ? " alert--error" : "")}>
      <h5 className="alert__type">{props.status}</h5>
      <p className="alert__message">{props.message}</p>
      <button onClick={() => { props.clearAlert(props.index) }} className="alert__button">X</button>
    </div>
  )
}

export default Alert;
