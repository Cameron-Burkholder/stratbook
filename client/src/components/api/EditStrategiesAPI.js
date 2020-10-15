/* client/src/components/api/EditStrategiesAPI.js */

import React from "react";

import CreateStrategiesAPI from "./CreateStrategiesAPI";
import Loading from "../partials/Loading.js";

/*
  @prop getAuthToken: function
  @prop alert: function
*/

class EditStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchStrategies = this.fetchStrategies.bind(this);

    this.state = {
      loading: true
    }
  }
  fetchStrategies() {

  }
  render() {
    return (
      <div id="EditStrategiesAPI">
        <h3>Edit Strategies</h3>
        <CreateStrategiesAPI getAuthToken={this.props.getAuthToken} alert={this.props.alert} fetchStrategies={this.fetchStrategies}/>
        { this.state.loading ? <Loading/> : (
          <p>something</p>
        )}
      </div>
    )
  }
}

export default EditStrategiesAPI;
