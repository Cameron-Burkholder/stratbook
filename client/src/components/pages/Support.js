/* client/src/components/pages/Support.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";

import { FEEDBACK_SUBMITTED } from "../../messages/messages.js";
import { ERROR_SUBMIT_FEEDBACK } from "../../messages/errors.js";

class Support extends React.Component {
  constructor(props) {
    super(props);

    this.updateFeedback = this.updateFeedback.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      feedback: ""
    }
  }
  updateFeedback(e) {
    this.setState({
      feedback: e.target.value
    })
  }
  submit() {
    if (this.state.feedback !== "") {
      const component = this;
      this.setState({
        loading: true
      })
      axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      axios.post("/api/users/submit-feedback", {
        feedback: this.state.feedback
      })
        .then((response) => {
        switch (response.data.status) {
          case FEEDBACK_SUBMITTED.status:
            component.setState({
              loading: false,
              feedback: ""
            });
            this.props.alert(FEEDBACK_SUBMITTED.message, "SUCCESS");
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
        component.props.alert(ERROR_SUBMIT_FEEDBACK.message, ERROR_SUBMIT_FEEDBACK.status);
      });
    } else {
      this.props.alert("You cannot submit a feedback post without any content.", "ERROR");
    }
  }
  render() {
    const patch_notes = this.props.release.patch_notes.map((patch_note, patch_note_index) => {
      return <li className="patch_note" key={patch_note_index}>{patch_note}</li>
    });
    return (
      <div className="page" id="support">
        <h1>Support</h1>
        <div className="support">
          <h2>{this.props.release.patch_name}.</h2>
          <h3>Stratbook version {this.props.release.version} - Patch Description</h3>
          <p className="patch_description">{this.props.release.patch_description}</p>
          <h3>Patch Notes</h3>
          <ul>
            { patch_notes }
          </ul>
          { !this.props.current_release_acknowledged ? (
            <button onClick={this.props.acknowledge_release}>Got it</button>
          ) : ""}
        </div>
        <div className="feedback">
          <h2>Submit Feedback</h2>
          { this.state.loading ? <Loading/> : (
            <div>
              <textarea onChange={this.updateFeedback} value={this.state.feedback}></textarea>
              <button onClick={this.submit}>Submit</button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Support;
