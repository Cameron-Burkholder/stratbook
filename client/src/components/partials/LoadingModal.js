/* client/components/partials/LoadingModal.js */

import React from "react";

/*
  @func: Loading
  @desc: render a loading animation
*/
const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
      </div>
      Fetching Data
    </div>
  )
}

export default LoadingModal;
