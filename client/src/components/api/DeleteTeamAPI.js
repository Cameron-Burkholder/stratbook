/* client/src/components/api/UpdateTeamNameAPI.js */

import React from "react";
import axios from "axios";
import Loading from "../partials/Loading.js";

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
          case "TEAM_DELETED":
            alert("Success! Your team has been deleted.");
            component.setState({
              loading: false
            });
            component.props.updateAuthToken();
            break;
          case "ERROR_WHILE_DELETING_TEAM":
            alert("An error occurred while attempting to delete your team.");
            component.setState({
              loading: false
            });
            component.props.updateAuthToken();
            break;
          case "USER_NOT_VERIFIED":
            alert("You have not verified your account. You must verify your account in order to delete a team.");
            component.setState({
              loading: false
            });
            break;
          case "USER_HAS_NO_TEAM":
            alert("You do not have a team. You must have a team to delete one.");
            component.setState({
              loading: false
            });
            break;
          case "TEAM_DOES_NOT_EXIST":
            alert("The team you requested to delete does not exist.");
            component.setState({
              loading: false
            });
            break;
          case "USER_NOT_QUALIFIED":
            alert("You are not qualified to delete the team.");
            component.setState({
              loading: false
            });
            break;
          default:
            alert("The name input is invalid or inappropriate.");
            component.setState({
              loading: false
            });
            break;
        }
      }).catch((error) => {
        console.log(error);
        alert("An error has occurred. Please try again shortly.");
        component.setState({
          loading: false
        });
      });
    }
  }
  render() {
    return (
      <div id="DeleteTeamAPI">
        { this.state.loading ? (
          <Loading/>
        ) : (
          <button onClick={this.onSubmit} id="DeleteTeamAPI">Delete Team</button>
        )}
      </div>
    )
  }
}

export default DeleteTeamAPI;
