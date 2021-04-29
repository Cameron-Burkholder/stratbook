/* client/src/components/partials/Toolbar.js */

import React from "react";
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
    if (this.props.function === "Editor") {
      this.setState({
        active: !this.state.active
      });
    }
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
    let sites = this.props.sites.map((site, index) => {
      return (
        <option className={(index === this.props.siteIndex ? "site--active" : "")} key={index}>{site}</option>
      )
    });
    let strategies;
    if (this.props.function !== "SharedViewer") {
      strategies = this.props.strategies.map((strat, index) => {
        return (
          <option key={index}>{strat.name}</option>
        )
      });
    }
    let link = this.props.function === "Editor" ? "/strategies/edit" : "/strategies";

    return (
      <div className={"toolbar" + (this.state.nav ? " toolbar--active" : "")}>
        { this.props.function !== "SharedViewer" ? (
          <button onClick={this.toggleStrategyNavigation} className={"toolbar__navigation-button" + (this.state.nav ? " toolbar__navigation-button--active" : "")}>&#9776;</button>
        ) : ""}
        { this.state.active ? (
          <div className="strategy__name-input">
            <input className="strategy__input" onChange={this.updateName} value={this.state.strategy}/>
            <button onClick={this.updateStrategyName}>&#10003;</button>
          </div>
        ) : (
          <h4 className="toolbar__strategy" onClick={this.changeName}>{this.state.strategy}</h4>
        )}
        { this.props.type === "ATTACK" ? (
          <div className="action-container">
            <div className="action" onClick={() => {
              if (this.props.function === "Editor") {
                this.props.insertDrone();
              }
            }}>
              <img className="action__img" src="../../media/min/drone.png" alt="Drone"/>
              <p>Drones ({this.props.drones.length}/{10})</p>
            </div>
            <div className="action" onClick={() => {
              if (this.props.function === "Editor") {
                this.props.insertBreach();
              }
            }}>
              <img className="action__img" src="../../media/min/breach.png" alt="Breach"/>
              <p>Breaches ({this.props.breaches.length})</p>
            </div>
          </div>
        ) : (
          <div className="action-container">
            <div className="action" onClick={() => {
              if (this.props.function === "Editor") {
                this.props.insertReinforcement();
              }
            }}>
              <img className="action__img" src="../../media/min/reinforcement.png" alt="Reinforcement"/>
              <p>Reinforcements ({this.props.reinforcements.length}/{10})</p>
            </div>
            <div className="action" onClick={() => {
              if (this.props.function === "Editor") {
                this.props.insertRotate();
              }
            }}>
              <img className="action__img" src="../../media/min/rotate.png" alt="Rotate"/>
              <p>Rotates ({this.props.rotates.length})</p>
            </div>
          </div>
        )}
        <h4 className="toolbar__label">Viewing in {this.props.function}</h4>
        { this.props.function !== "SharedViewer" ? (
          <div className={"toolbar__navigation" + (this.state.nav ? " toolbar__navigation--active" : "")}>
            <h3>{this.props.map.name}</h3>
            { this.props.function === "Editor" ? (
              <button className="button toolbar__button" onClick={this.props.save}>Save</button>
            ) : ""}
            { this.props.function !== "SharedViewer" ? (
              <Link to={link} onClick={() => {
                if (this.props.updated) {

                } else {
                  this.props.fetchStrategies();
                }
              }} id="showMaps">Back to Maps</Link>
            ) : ""}
            <div className="strategy__navigation">
              <h4>Mode</h4>
              <select className="type-selector" onChange={(e) => {
                this.props.updateType(e.target.value);
              }}>
                <option>ATTACK</option>
                <option>DEFENSE</option>
              </select>
              <div className="site-container">
                <h4>Site</h4>
                <select onChange={(e) => {
                  this.props.selectSite(this.props.sites.indexOf(e.target.value));
                }} value={this.props.sites[this.props.siteIndex]}>
                  { sites }
                </select>
              </div>
              <h4>Strategies</h4>
              <div className="strategy-selector">
                <select onChange={(e) => {
                  this.props.selectStrategy(e.target.options.selectedIndex);
                }} value={this.props.strategies[this.props.strategyIndex].name}>
                  { strategies }
                </select>
                { this.props.function === "Editor" ? (
                  <div className="strategy-control">
                    <button onClick={this.props.addStrategy}>+</button>
                    <button onClick={this.props.removeStrategy}>-</button>
                  </div>
                ) : ""}
              </div>
            </div>
          </div>
        ) : ""}
      </div>
    )
  }
}

export default Toolbar;
