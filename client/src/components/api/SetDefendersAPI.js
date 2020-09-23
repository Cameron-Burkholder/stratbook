/* client/components/api/SetDefendersAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";
import DefendersForm from "../partials/DefendersForm.js";

/*
  @func: SetDefendersAPI
  @desc: make a request to server to set defenders
  @prop defenders: Array
  @prop getAuthToken: function


*/
class SetDefendersAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: false,
      defenders: this.props.defenders
    }

  }
  /*
    @func: onChange
    @desc: update state of platform field
    @param e: Object.Event
  */
  onChange(defender) {
    const index = this.state.defenders.indexOf(defender);
    if (index < 0) {
      this.setState({
        defenders: [...this.state.defenders, defender]
      })
    } else {
      let new_defenders = [...this.state.defenders];
      new_defenders.splice(index, 1);
      this.setState({
        defenders: new_defenders
      })
    }
  }
  /*
    @func: onSubmit
    @desc: submit form data to server, rerender page depending on response
    @prop getAuthToken: function
    @prop updateAuthToken: function
  */
  onSubmit(e) {
    e.preventDefault();
    const component = this;
    this.setState({
      errors: {},
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch("/api/users/set-defenders", {
      defenders: this.state.defenders
    }).then((response) => {
      switch (response.data.status) {
        case "DEFENDERS_SET":
          component.setState({
            loading: false,
          });
          component.props.updateAuthToken();
          break;
        case "ERROR_WHILE_SETTING_DEFENDERS":
          component.setState({
            loading: false
          });
          alert("An error occurred while setting preferred defenders. Please try again.");
          break;
        case "USER_NOT_FOUND":
        case "INVALID_DEFENDERS":
        default:
          component.setState({
            loading: false,
            errors: response.data.errors
          });
          alert("An error has occurred.");
          break;
      }
    }).catch((error) => {
      console.log(error);
      alert("An error has occurred. Please try again shortly.");
    });
  }
  render() {
    return (
      <div id="SetDefendersAPI">
        { this.state.loading ? (
          <Loading/>
        ) : (
          <DefendersForm defenders={this.state.defenders} onChange={this.onChange} onSubmit={this.onSubmit} errors={this.state.errors}/>
        )}
      </div>
    )
  }
}

export default SetDefendersAPI;
