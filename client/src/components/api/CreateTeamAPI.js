/* client/components/api/CreateTeamAPI.js */

import React from "react";
import axios from "axios";

import CreateTeamForm from "../partials/CreateTeamForm.js";

/*
  @func: CreateTeamAPI
  @desc: manage state of team name and make requests to server
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @state:
    name: String
*/
class CreateTeamAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      errors: {}
    }
  }
  /*
    @func: onChange
    @desc: update state of platform field
    @param e: Object.Event
  */
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  /*
    @func: onSubmit
    @desc: submit form data to server, rerender page depending on response
    @param e: Object.Event
  */
  onSubmit(e) {
    e.preventDefault();
    const component = this;
    this.setState({
      errors: {},
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.post("/api/teams/create-team", {
      name: this.state.name
    }).then((response) => {
      switch (response.data.status) {
        case "TEAM_CREATED":
          component.setState({
            loading: false,
          });
          component.props.alert("Your team has been created.", "SUCCESS");
          this.props.updateAuthToken();
          break;
        default:
          component.setState({
            loading: false,
            errors: response.data.errors
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.props.alert("An error has occurred while attempting to create team.", "ERROR");
    });
  }
  render() {
    return (
      <div id="CreateTeamAPI">
        <h3>Create a Team</h3>
        <CreateTeamForm onSubmit={this.onSubmit} onChange={this.onChange} errors={this.state.errors} loading={this.state.loading} name={this.state.name}/>
      </div>
    )
  }
}

export default CreateTeamAPI;
