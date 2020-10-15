/* client/components/api/DeleteUserAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";

/*
  @func: DeleteUserAPI
  @desc: make a request to server to delete account
  @prop getAuthToken: function
  @prop logout: function

*/
class DeleteUserAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: false
    }

  }
  /*
    @func: onSubmit
    @desc: submit form data to server, rerender page depending on response
  */
  onSubmit() {
    if (window.confirm("Confirming this dialogue will permanently delete your account and all associated data including teams of which you are the sole member, editor, or admin. This cannot be undone.")) {
      const component = this;
      this.setState({
        errors: {},
        loading: true
      });
      axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
      axios.delete("/api/users/delete")
        .then((response) => {
        switch (response.data.status) {
          case "USER_DELETED":
            component.setState({
              loading: false
            });
            component.props.alert("Your account has been deleted.", "SUCCESS");
            this.props.logout();
          case "USER_AND_TEAM_DELETED":
            component.setState({
              loading: false,
            });
            component.props.alert("Your account and associated team have been deleted.", "SUCCESS");
            this.props.logout();
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
        component.props.alert("An error has occurred while attempting to delete user.", "ERROR");
      });
    }
  }
  render() {
    return (
      <div id="DeleteUserAPI">
        { this.state.loading ? (
          <Loading/>
        ) : (
          <div>
            <p>Warning: this action is permanent and cannot be undone.</p>
            <button id="deleteAccount" className="form__button form__button--submit" onClick={this.onSubmit}>Delete Account</button>
          </div>
        )}
      </div>
    )
  }
}

export default DeleteUserAPI;
