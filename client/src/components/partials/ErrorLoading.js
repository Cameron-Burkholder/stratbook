/* client/src/components/partials/ErrorLoading.js */

import React from "react";

const ErrorLoading = () => {
  return (
    <div className="error-loading">
      <div className="error-loading__modal">
        <h3>Unable to load data</h3>
        <p>Stratbook was unable to load the data required for this page to function. This typically happens when the client (your device) is unable to contact the servers, so check your network connection and refresh the page.
        <br/><br/>
        If you have a network connection and are still unable to retrieve the necessary data, there is likely a bug or other problem with the servers.
        If you suspect this is the case, please email the lead developer at
        <a id="email" target="_blank" href="mailto:cameron@burkholderwd.com">cameron@burkholderwd.com</a>.</p>
        <a id="refresh" href="/">Refresh</a>
      </div>
    </div>
  )
}

export default ErrorLoading;
