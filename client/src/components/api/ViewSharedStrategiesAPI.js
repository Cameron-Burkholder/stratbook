import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { SHARED_STRATEGIES_FOUND } from "../../messages/messages.js";
import { ERROR_VIEW_SHARED_STRATEGIES } from "../../messages/errors.js";

import Editor from "../partials/Editor.js";
import Loading from "../partials/Loading.js";

class ViewSharedStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchStrategies = this.fetchStrategies.bind(this);

    this.state = {
      loading: true,
      hasLoaded: false,
      errors: {},
    }
  }
  fetchStrategies() {
    const component = this;
    this.setState({
      loading: true
    });
    axios.get("/api/strategies/view-shared")
      .then((response) => {
        switch(response.data.status) {
          case SHARED_STRATEGIES_FOUND.status:
            component.setState({
              loading: false,
              hasLoaded: true,
              strategies: response.data.strategies
            });
            break;
          default:
            component.setState({
              loading: false,
              hasLoaded: true
            });
            break;

        }
      }).catch((error) => {
        console.log(error);
        component.setState({
          loading: false,
          hasLoaded: true
        });
        component.props.alert(ERROR_VIEW_SHARED_STRATEGIES.message, ERROR_VIEW_SHARED_STRATEGIES.status);
      });
  }

  componentDidMount() {
    if (!this.state.hasLoaded) {
      this.fetchStrategies();
    }
  }
  render() {
    let contents;
    if (this.state.loading) {
      contents = <Loading/>
    } else {
      if (this.state.hasLoaded) {
        const shared_strategies = this.state.strategies.map((strategy, index) => {
          return (
            <div className="shared_strategy_card" style={{
              backgroundImage: `url("../../media/min/maps/${strategy.strategy.map}.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }} key={index}>
              <Link to={`/shared/${strategy.shared_key}`} className="shared_strategy_link">
                <div className="shared_strategy_overlay">
                  <h3>{strategy.strategy.name}</h3>
                  <h4>Team: {strategy.team}</h4>
                  <h4>Author: {strategy.author ? strategy.author : "Unnknown"}</h4>
                </div>
              </Link>
            </div>
          )
        });
        contents = (
          <div className="shared-strategies">
            <h2>Shared Strategies</h2>
            <div className="shared-strategy-container">
              { shared_strategies }
            </div>
          </div>
        )
      } else {
        contents = "Waiting for server";
      }
    }
    return (
      <div id="ViewSharedStrategiesAPI">
        { contents }
      </div>
    )
  }
}

export default ViewSharedStrategiesAPI;
