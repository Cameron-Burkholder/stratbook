/* client/src/components/partials/Toolbar.js */

import React from "react";
import Dropdown from "./Dropdown.js";
import { Link } from "react-router-dom";

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.changeName = this.changeName.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateStrategyName = this.updateStrategyName.bind(this);
    this.toggleStrategyNavigation = this.toggleStrategyNavigation.bind(this);

    this.state = {
      strategy: (this.props.strategy !== "" ? this.props.strategy : "Unnamed"),
      active: false,
      nav: false
    }
  }
  changeName() {
    this.setState({
      active: !this.state.active
    });
  }
  updateName(e) {
    this.setState({
      strategy: e.target.value
    });
  }
  updateStrategyName() {
    if (this.state.strategy !== "" && this.state.strategy !== " ") {
      this.props.updateStrategyName(this.state.strategy);
      this.setState({
        active: false
      });
    } else {
      this.props.alert("Strategy name cannot be empty.");
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
        { this.state.active ? (
          <div className="strategy__name-input">
            <input className="strategy__input" onChange={this.updateName} value={this.state.strategy}/>
            <button onClick={this.updateStrategyName}>&#10003;</button>
          </div>
        ) : (
          <h4 className="toolbar__strategy" onClick={this.changeName}>{this.state.strategy}</h4>
        )}
        { this.props.type === "ATTACK" ? (
          <div className="dropdown-container">
            <Dropdown title="Drones" links={["Insert drone", "Remove drone"]} actions={[this.props.insertDrone, this.props.removeDrone]}/>
            <Dropdown title="Breaches" links={["Insert breach", "Remove breach"]} actions={[this.props.insertBreach, this.props.removeBreach]}/>
          </div>
        ) : (
          <div className="dropdown-container">
            <Dropdown title="Rotates" links={["Insert rotate", "Remove rotate"]} actions={[this.props.insertRotate, this.props.removeRotate]}/>
            <Dropdown title="Reinforcements" links={["Insert reinforcements", "Remove reinforcements"]} actions={[this.props.insertReinforcement, this.props.removeReinforcement]}/>
          </div>
        )}
        <div className={"toolbar__navigation" + (this.state.nav ? " toolbar__navigation--active" : "")}>
          <h3>{this.props.map.name}</h3>
          <button className="button toolbar__button" onClick={this.props.save}>Save</button>
          <Link to="/strategies/edit" onClick={this.props.fetchStrategies} id="showMaps">Back to Maps</Link>
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
              <div className="strategy-control">
                <button onClick={this.props.addStrategy}>Add Strategy</button>
                <button onClick={this.props.removeStrategy}>Remove Strategy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Toolbar;
