/* client/src/components/partials/Toolbar.js */

import React from "react";

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.changeName = this.changeName.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateStrategyName = this.updateStrategyName.bind(this);

    this.state = {
      strategy: (this.props.strategy !== "" ? this.props.strategy : "Unnamed"),
      active: false
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
  render() {
    return (
      <div className="toolbar">
        <p>BARS</p>
        { this.state.active ? (
          <div className="strategy__name-input">
            <input className="strategy__input" onChange={this.updateName} value={this.state.strategy}/>
            <button onClick={this.updateStrategyName}>&#10003;</button>
          </div>
        ) : (
          <h4 className="toolbar__strategy" onClick={this.changeName}>{this.state.strategy}</h4>
        )}
        <button className="button toolbar__button" onClick={this.props.save}>Save</button>
        <p>Drones</p>
        <p>Breaches</p>
      </div>
    )
  }
}

export default Toolbar;
