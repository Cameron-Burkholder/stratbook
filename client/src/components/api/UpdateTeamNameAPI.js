/* client/src/components/api/UpdateTeamNameAPI.js */

import React from "react";
import axios from "axios";
import Loading from "../partials/Loading.js";
import { TEAM_FOUND } from "../../messages/messages.js";
import { TEAM_NAME_UPDATED } from "../../messages/emails.js";
import { ERROR_VIEW_TEAM } from "../../messages/errors.js";
import { ERROR_UPDATE_TEAM_NAME } from "../../messages/errors.js";

class UpdateTeamNameAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchTeamName = this.fetchTeamName.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: true,
      currentName: "",
      newName: ""
    }
  }
  fetchTeamName() {
    const component = this;
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get("/api/teams/view-team")
      .then((response) => {
      switch (response.data.status) {
        case TEAM_FOUND.status:
          component.setState({
            loading: false,
            currentName: response.data.team_data.name
          });
          break;
        default:
          component.setState({
            loading: false
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.setState({
        loading: false
      });
      component.props.alert(ERROR_VIEW_TEAM.message, ERROR_VIEW_TEAM.status);
    });
  }
  onChange(e) {
    this.setState({
      newName: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const component = this;
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch("/api/teams/update-name", {
      name: this.state.newName
    })
      .then((response) => {
      switch (response.data.status) {
        case TEAM_NAME_UPDATED.status:
          component.setState({
            loading: false,
            currentName: component.state.newName
          });
          component.props.alert("Team name has been updated.", "SUCCESS");
          break;
        default:
          component.setState({
            loading: false
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.setState({
        loading: false
      });
      component.props.alert(ERROR_UPDATE_TEAM_NAME.message, ERROR_UPDATE_TEAM_NAME.status);
    });
  }
  componentDidMount() {
    if (this.state.loading) {
      this.fetchTeamName();
    }
  }
  render() {
    return (
      <div id="UpdateTeamNameAPI">
      { this.state.loading ? (
        <Loading/>
      ) : (
        <div>
          <h3 className="current-name">{this.state.currentName}</h3>
          <div className="update-name-group">
            <input className="team-name-input form__input" onChange={this.onChange} id="newName" type="text" value={this.state.newName} placeholder={this.state.currentName}/>
            <button className="team-name-button button" onClick={this.onSubmit}>Update Name</button>
          </div>
        </div>
      )}
      </div>
    )
  }
}

export default UpdateTeamNameAPI;
