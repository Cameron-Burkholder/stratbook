/* client/src/components/partials/ViewerSidebar.js */

import React from "react";

import Toggle from "./Toggle.js";

class ViewerSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSidebar = this.toggleSidebar.bind(this);

    this.state = {
      index: 0,
      name: "",
      showSidebar: false
    }
  }
  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    });
  }
  render() {
    const sites = this.props.sites.map((site, index) => {
      return (
        <div className={"site" + (this.props.siteIndex === index ? " site--active" : "")} onClick={() => { this.props.selectSite(index) }} key={index}>
          <span className="site__number">Site {index + 1}</span>
          <p className="site__name">{site}</p>
        </div>
      )
    });
    const scenes = this.props.scenes.map((scene, index) => {
      return (
        <div className={"scene" + (this.props.sceneIndex === index ? " scene--active" : "")}
          onClick={() => {
            if (!this.state.active) {
              this.props.selectScene(index);
            }
          }} key={index}>
          <span className="scene__number">Scene {index + 1}</span>
          <p className="scene__name">{scene.name}</p>
        </div>
      )
    });
    const strategies = (this.props.type === "ATTACK" ? "" : (
      this.props.strategies.map((strat, index) => {
        return (
          <div className={"strategy" + (this.props.strategyIndex === index ? " strategy--active" : "")} onClick={() => { this.props.selectStrategy(index) }} key={index}>
            <p className="strategy__name">{strat.name}</p>
          </div>
        )
      })
    ));
    return (
      <div className={"sidebar" + (this.state.showSidebar ? " sidebar--active" : "")}>
        <button onClick={this.toggleSidebar}>&#8594;</button>
        <div className="sidebar-body">
          { this.props.type === "ATTACK" ? (
            <div className="site-container">
              <h3 className="site-container__heading">{this.props.map}: {this.props.type}</h3>
              <h4 className="site-container__subtitle">{this.props.strategy}</h4>
              { this.props.shared ? (
                <div className="viewer-toggle">
                  <label className="switch">
                    <span className={"slider slider--active round"}></span>
                  </label>
                  <p>Shared</p>
                  <a className="toggle__link" href={( this.props.shared ? window.location.protocol + "//" + window.location.host + "/shared/" + this.props.shared_key : "")} target="_blank">view</a>
                  <button className="toggle__button" onClick={() => {
                    const temp = document.createElement("textarea");
                    temp.value = this.props.link;
                    document.body.appendChild(temp);
                    temp.select();
                    temp.setSelectionRange(0, 99999);
                    document.execCommand("copy");
                    document.body.removeChild(temp);
                    this.props.alert("The link to your shared strategy has been copied.", "Strategy Link Copied");
                  }}>&#128203;</button>
                </div>
              ) : ""}
              { sites }
            </div>
          ) : (
            <div className="strategy-container">
              <h3 className="strategy-container__heading">{this.props.map}: {this.props.type}</h3>
              <h4 className="strategy-container__subtitle">{this.props.sites[this.props.siteIndex]}</h4>
              { this.props.shared ? (
                <div className="viewer-toggle">
                  <label className="switch">
                    <span className={"slider slider--active round"}></span>
                  </label>
                  <p>Shared</p>
                  <a className="toggle__link" href={( this.props.shared ? window.location.protocol + "//" + window.location.host + "/shared/" + this.props.shared_key : "")} target="_blank">view</a>
                  <button className="toggle__button" onClick={() => {
                    const temp = document.createElement("textarea");
                    temp.value = this.props.link;
                    document.body.appendChild(temp);
                    temp.select();
                    temp.setSelectionRange(0, 99999);
                    document.execCommand("copy");
                    document.body.removeChild(temp);
                    this.props.alert("The link to your shared strategy has been copied.", "Strategy Link Copied");
                  }}>&#128203;</button>
                </div>
              ) : ""}
              { strategies }
            </div>
          )}
          <div className="scene-container">
            <h3 className="scene-container__heading">Scenes</h3>
            { scenes }
          </div>
        </div>
      </div>
    )
  }
}

export default ViewerSidebar;
