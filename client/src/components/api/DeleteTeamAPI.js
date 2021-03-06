/* client/src/components/api/UpdateTeamNameAPI.js */

import React from "react";
import axios from "axios";
import Loading from "../partials/Loading.js";
import { TEAM_DELETED } from "../../messages/messages.js";
import { ERROR_DELETE_TEAM } from "../../messages/errors.js";

class DeleteTeamAPI extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: false
    }
  }
  onSubmit(e) {
    e.preventDefault();
    if (window.confirm("Deleting your team is a permanent action that cannot be undone. All data associated with this team will be purged from the Stratbook databases. Are you sure you want to do this?")) {
      const component = this;
      axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
      axios.delete("/api/teams/delete-team")
        .then((response) => {
        switch (response.data.status) {
          case TEAM_DELETED.status:
            component.setState({
              loading: false
            });
            component.props.alert("Your team has been deleted.", "SUCCESS");
            component.props.updateAuthToken();
            break;
          default:
            component.setState({
              loading: false
            });
            component.props.updateAuthToken();
            component.props.alert(response.data.message, response.data.status);
            break;
        }
      }).catch((error) => {
        console.log(error);
        component.setState({
          loading: false
        });
        component.props.alert(ERROR_DELETE_TEAM.message, ERROR_DELETE_TEAM.status);
      });
    }
  }
  render() {
    return (
      <div id="DeleteTeamAPI">
        { this.state.loading ? (
          <Loading/>
        ) : (
          <button onClick={this.onSubmit} className="form__button form__button--submit button button--danger" id="DeleteTeamAPI">Delete Team</button>
        )}
      </div>
    )
  }
}

export default DeleteTeamAPI;
