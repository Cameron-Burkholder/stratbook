/* client/components/api/SharedStrategiesAPI.js */

import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { SHARED_STRATEGY_FOUND } from "../../messages/messages.js";
import { ERROR_VIEW_SHARED_STRATEGY } from "../../messages/errors.js";

import Editor from "../partials/Editor.js";
import LoadingModal from "../partials/LoadingModal.js";

/*
  @func: SharedStrategiesAPI
  @desc: manage state of strategies page and make requests to server
  @prop alert: function
  @prop shared_key: string
*/
class SharedStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchStrategy = this.fetchStrategy.bind(this);

    this.state = {
      loading: true,
      hasLoaded: false,
      errors: {},
    }
  }
  fetchStrategy(shared_key) {
    const component = this;
    this.setState({
      loading: true
    });
    axios.get(`/api/strategies/shared/${shared_key}`)
      .then((response) => {
      switch (response.data.status) {
        case SHARED_STRATEGY_FOUND.status:
          component.setState({
            loading: false,
            hasLoaded: true,
            strategy: response.data.strategy
          });
          break;
          default:
          component.setState({
            loading: false,
            hasLoaded: true
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.setState({
        loading: false,
        hasLoaded: true
      });
      component.props.alert(ERROR_VIEW_SHARED_STRATEGY.message, ERROR_VIEW_SHARED_STRATEGY.status);
    });
  }
  componentDidMount() {
    if (!this.state.hasLoaded) {
      this.fetchStrategy(this.props.shared_key);
    }
  }
  render() {
    let contents;
    if (this.state.loading) {
      contents = <LoadingModal message="Fetching Strategy"/>
    } else {
      if (this.state.strategy) {
        if (this.state.hasLoaded) {
          contents = <Editor function="SharedViewer" strategy={this.state.strategy} type={this.state.strategy.type} alert={this.props.alert}/>
        } else {
          contents = "Waiting for server";
        }
      } else {
        contents = <Redirect to="/dashboard"/>
      }
    }
    return (
      <div id="SharedStrategiesAPI">
        { contents }
      </div>
    )
  }
}

export default SharedStrategiesAPI;
