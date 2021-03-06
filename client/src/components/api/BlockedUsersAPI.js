/* client/src/components/api/BlockedUsersAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";
import ErrorLoading from "../partials/ErrorLoading.js";
import { BLOCKED_USERS_FOUND } from "../../messages/messages.js";
import { ERROR_VIEW_BLOCKED_USERS } from "../../messages/errors.js";

/*
  @func: BlockedUsersAPI
  @desc: view and manage blocked users
  @prop getAuthToken: function
  @prop updateAuthToken: function

*/
class BlockedUsersAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchBlockedUsers = this.fetchBlockedUsers.bind(this);
    this.unblockUser = this.unblockUser.bind(this);

    this.state = {
      blocked_users: undefined,
      loading: true
    }
  }
  /*
    @func: fetchTeamData
    @desc: get team data from server
  */
  fetchBlockedUsers() {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get("/api/teams/view-blocked-users")
      .then((response) => {
      switch (response.data.status) {
        case BLOCKED_USERS_FOUND.status:
          component.setState({
            loading: false,
            blocked_users: response.data.blocked_users
          });
          break;
        default:
          component.setState({
            loading: false,
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.setState({
        loading: false,
        error: true
      });
      component.props.alert(ERROR_VIEW_BLOCKED_USERS.message, ERROR_VIEW_BLOCKED_USERS.status);
    });
  }
  componentDidMount() {
    if (!this.state.blocked_users) {
      this.fetchBlockedUsers();
    }
  }
  unblockUser(username, _id) {
    if (window.confirm(`You are about to unblock ${username}. He/she will be able to join the team if he/she has the join code. Are you sure?`)) {
      const component = this;
      this.setState({
        loading: true
      });
      axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
      axios.patch("/api/teams/unblock-user", {
        _id: _id
      })
        .then((response) => {
        switch (response.data.status) {
          case "USER_UNBLOCKED":
            component.setState({
              loading: false
            });
            component.props.alert("User has been unblocked successfully.", "SUCCESS");
            component.fetchBlockedUsers();
            break;
          default:
            component.setState({
              loading: false,
            });
            component.props.alert(response.data.message, response.data.status);
            break;
        }
      }).catch((error) => {
        console.log(error);
        component.setState({
          loading: false
        });
        component.props.alert("An error has occurred while attempting to unblock user.", "ERROR");
      });
    }
  }
  render() {
    let contents = <Loading/>;
    if (this.state.error) {
      contents = <ErrorLoading/>;
    } else {
      if (this.state.blocked_users) {
        if (this.state.blocked_users.length > 0) {
          contents = this.state.blocked_users.map((user) => {
            return (
              <div className="blocked-user">
                <h4>{user.username}</h4>
                <button className="button button--secondary" onClick={() => { this.unblockUser(user.username, user._id) }}>Unblock</button>
              </div>
            )
          })
        } else {
          contents = "No users have been blocked.";
        }
      }
    }
    return (
      <div id="BlockedUsersAPI">
        { this.state.loading ? (
          <Loading/>
        ) : (
          <div>
            <h3>Blocked Users</h3>
            { contents }
          </div>
        )}
      </div>
    )
  }
}

export default BlockedUsersAPI;
