/* client/components/api/PushNotificationsAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";

class PushNotificationsAPI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }
  render() {
    return (
      <div id="PushNotificationsAPI">
        { this.state.loading ? <Loading/> : (
          <div>
            <p>Coming soon</p>
          </div>
        )}
      </div>
    )
  }
}

export default PushNotificationsAPI;
