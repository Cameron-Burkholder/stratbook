/* client/components/api/SetAttackersAPI.js */

import React from "react";
import axios from "axios";
import { ATTACKERS_SET } from "../../messages/messages.js";
import { ERROR_ATTACKERS } from "../../messages/errors.js";

import Loading from "../partials/Loading.js";
import AttackersForm from "../partials/AttackersForm.js";

/*
  @func: SetAttackersAPI
  @desc: make a request to server to set attackers
  @prop attackers: Array
  @prop getAuthToken: function


*/
class SetAttackersAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: false,
      attackers: this.props.attackers
    }

  }
  /*
    @func: onChange
    @desc: update state of platform field
    @param e: Object.Event
  */
  onChange(attacker) {
    const index = this.state.attackers.indexOf(attacker);
    if (index < 0) {
      this.setState({
        attackers: [...this.state.attackers, attacker]
      })
    } else {
      let new_attackers = [...this.state.attackers];
      new_attackers.splice(index, 1);
      this.setState({
        attackers: new_attackers
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
    axios.patch("/api/users/set-attackers", {
      attackers: this.state.attackers
    }).then((response) => {
      switch (response.data.status) {
        case ATTACKERS_SET.status:
          component.setState({
            loading: false,
          });
          component.props.updateAuthToken();
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
      component.props.alert(ERROR_ATTACKERS.message, ERROR_ATTACKERS.status);
    });
  }
  render() {
    return (
      <div id="SetAttackersAPI">
        { this.state.loading ? (
          <Loading/>
        ) : (
          <AttackersForm attackers={this.state.attackers} onChange={this.onChange} onSubmit={this.onSubmit} errors={this.state.errors}/>
        )}
      </div>
    )
  }
}

export default SetAttackersAPI;
