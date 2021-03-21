/* client/src/components/partials/SharedViewerLineup.js */

import React from "react";
import { UTILITY_GUIDE } from "../../data.js";

class SharedViewerLineup extends React.Component {
  constructor(props) {
    super(props);

    this.toggleLineup = this.toggleLineup.bind(this);

    this.state = {
      active: false
    }
  }
  toggleLineup() {
    this.setState({
      active: !this.state.active
    })
  }
  render() {
    const lineup = this.props.roles.map((role, index) => {
      return (
        <div className={"role" + (this.props.activeOperator === index ? " role--active" : "")} key={index}>
          <div className="role__head">
            <div className="role__options">
              <p className="role__role">Role: {this.props.roles[index]}</p>
              <p className="role__utility">Utility: {this.props.utility[index]}</p>
            </div>
            <div className="role__image" onClick={() => { this.props.selectOperator(index) }}>
              <p>{this.props.operators[index]}</p>
              <img className="role__image" src={`../../media/min/operators/${this.props.operators[index].toLowerCase()}.png`} alt="Operator"/>
            </div>
          </div>

          { this.props.activeOperator === index ? (
            <div className="role__body">
              <div>
                { this.props.gadgets[index].gadget && this.props.gadgets[index].count !== 0 ? (
                  <div className="role__gadget">
                    <p>{this.props.gadgets[index].gadget} ({this.props.gadgets[index].count - this.props.gadgetPositions[index].length})</p>
                    <img className="role__gadget-image" src={`../../media/min/gadgets/${this.props.gadgets[index].gadget.toUpperCase().replace(" ", "_").replace(" ", "_")}.png`} alt="Gadget"/>
                  </div>
                ) : ""}
              </div>
              <div>
                { this.props.utility[index] && this.props.utility[index] !== "UTILITY" ? (
                  <div className="role__utility">
                    <p>{this.props.utility[index]} ({UTILITY_GUIDE[this.props.utility[index]] - this.props.utilityPositions[index].length})</p>
                    <img className="role__utility-image" src={`../../media/min/utility/${this.props.utility[index].toUpperCase().replace(" ", "_")}.png`} alt="Utility"/>
                  </div>
                ) : ""}
              </div>
            </div>
          ) : ""}
        </div>
      )
    })
    return (
      <div className={"lineup" + (this.state.active ? " lineup--active" : "")}>
        <button onClick={this.toggleLineup}>&#8594;</button>
        <div className="lineup-body">
          <h3>Lineup</h3>
          { lineup }
        </div>
      </div>
    )
  }
}

export default SharedViewerLineup;
