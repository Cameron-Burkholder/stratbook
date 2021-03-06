/* client/components/partials/LoadingModal.js */

import React from "react";

/*
  @func: Loading
  @desc: render a loading animation
*/
const LoadingModal = (props) => {
  return (
    <div className="loading-modal">
      <div className="loader">
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
        </svg>
      </div>
      { props.message ? props.message : "Fetching Data" }
    </div>
  )
}

export default LoadingModal;
