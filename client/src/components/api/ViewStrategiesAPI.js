/* client/components/api/ViewStrategiesAPI.js */

import React from "react";
import { Redirect } from "react-router";
import axios from "axios";

import LoadingModal from "../partials/LoadingModal.js";
import Pagination from "../partials/Pagination.js";

/*
  @func: ViewStrategiesAPI
  @desc: manage state of strategies page and make requests to server
  @prop team_code: String
  @state:
    strategies: Object
    index: Int
    loading: Boolean
*/
class ViewStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      strategies: [],
      index: 0,
      loading: false
    }
  }
  /*
    @func increment
    @desc increment strategy index
  */
  increment() {
    if (this.state.index + 1 < this.state.strategies.length) {
      this.setState({
        index: this.state.index + 1
      });
    }
  }
  /*
    @func decrement
    @desc decrement strategy index
  */
  decrement() {
    if (this.state.index - 1 >= 0) {
      this.setState({
        index: this.state.index - 1
      });
    }
  }
  render() {
    let contents;
    if (this.state.loading) {
      contents = <LoadingModal/>
    } else {
      if (this.props.team_code && this.props.team_code !== "") {
        if (this.state.strategies.length > 0) {
          contents = (
            <div className="contents">
              <Pagination title="Strategy" index={this.state.index} increment={this.increment} decrement={this.decrement}/>
            </div>
          )
        } else {
          contents = <p>Your team does not currently have any strategies.</p>
        }
      } else {
        contents = <p>You do not belong to a team at this time. In order to view strategies, you must be a part of a team.</p>
      }

    }
    return (
      <div id="ViewStrategiesAPI">
        { contents }
      </div>
    )
  }
}

export default ViewStrategiesAPI;
