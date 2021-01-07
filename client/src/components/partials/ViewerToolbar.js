/* client/src/components/partials/ViewerToolbar.js */

import React from "react";
import Dropdown from "./Dropdown.js";
import { Link } from "react-router-dom";

class ViewerToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleStrategyNavigation = this.toggleStrategyNavigation.bind(this);

    this.state = {
      strategy: (this.props.strategy !== "" ? this.props.strategy : "Unnamed"),
      nav: false
    }
  }
  toggleStrategyNavigation() {
    this.setState({
      nav: !this.state.nav
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.strategy !== this.state.strategy && !this.state.active) {
      this.setState({
        strategy: this.props.strategy
      });
    }
  }
  render() {
    let sites = (this.props.type === "ATTACK" ? "" : (
      this.props.sites.map((site, index) => {
        return (
          <button onClick={() => { this.props.selectSite(index) }} className={(index === this.props.siteIndex ? "site--active" : "")} key={index}>{site}</button>
        )
      })
    ))
    let strategies = this.props.strategies.map((strat, index) => {
      return (
        <button onClick={() => { this.props.selectStrategy(index) }} className={(index === this.props.strategyIndex ? "strategy--active" : "")} key={index}>{strat.name}</button>
      )
    });
    return (
      <div className="toolbar">
        <button onClick={this.toggleStrategyNavigation} className={"toolbar__navigation-button" + (this.state.nav ? " toolbar__navigation-button--active" : "")}>&#9776;</button>
        <h4 className="toolbar__strategy" onClick={this.changeName}>{this.state.strategy}</h4>
        <div className={"toolbar__navigation" + (this.state.nav ? " toolbar__navigation--active" : "")}>
          <h3>{this.props.map.name}</h3>
          <Link to="/strategies" onClick={this.props.fetchStrategies} id="showMaps">Back to Maps</Link>
          <div className="strategy__navigation">
            <h4>Mode</h4>
            <div className="type-selector">
              <button onClick={() => { this.props.updateType("ATTACK") }} className={this.props.type === "ATTACK" ? "type--active" : ""}>Attack</button>
              <button onClick={() => { this.props.updateType("DEFENSE") }} className={this.props.type === "ATTACK" ? "" : "type--active"}>Defense</button>
            </div>
            { this.props.type === "ATTACK" ? "" : (
              <div className="site-container">
                <h4>Sites</h4>
                <div>
                  { sites }
                </div>
              </div>
            )}
            <h4>Strategies</h4>
            <div className="strategy-selector">
              { strategies }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ViewerToolbar;