/* client/src/components/partials/SharedViewerToolbar.js */

import React from "react";

class SharedViewerToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      strategy: (this.props.strategy !== "" ? this.props.strategy : "Unnamed"),
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.strategy !== this.state.strategy && !this.state.active) {
      this.setState({
        strategy: this.props.strategy
      });
    }
  }
  render() {

    return (
      <div className={"toolbar" + (this.state.nav ? " toolbar--active" : "")}>
        <h4 className="toolbar__strategy" onClick={this.changeName}>{this.state.strategy}</h4>
        { this.props.type === "ATTACK" ? (
          <div className="action-container">
            <div className="action">
              <img className="action__img" src="../../media/min/drone.png" alt="Drone"/>
              <p>Drones ({this.props.drones.length}/{10})</p>
            </div>
            <div className="action">
              <img className="action__img" src="../../media/min/breach.png" alt="Breach"/>
              <p>Breaches ({this.props.breaches.length})</p>
            </div>
          </div>
        ) : (
          <div className="action-container">
            <div className="action">
              <img className="action__img" src="../../media/min/reinforcement.png" alt="Reinforcement"/>
              <p>Reinforcements ({this.props.reinforcements.length}/{10})</p>
            </div>
            <div className="action">
              <img className="action__img" src="../../media/min/rotate.png" alt="Rotate"/>
              <p>Rotates ({this.props.rotates.length})</p>
            </div>
          </div>
        )}
        <h4 className="toolbar__label">Viewing</h4>
      </div>
    )
  }
}

export default SharedViewerToolbar;
