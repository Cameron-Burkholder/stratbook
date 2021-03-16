/* client/src/components/partials/Viewer.js */

import React from "react";
import { ATTACKER_ROLES, ATTACKER_OPERATORS, DEFENDER_ROLES, DEFENDER_OPERATORS, UTILITY_GUIDE, UTILITY } from "../../data.js";
const attackRoles = ATTACKER_ROLES;
const defenderRoles = DEFENDER_ROLES;
const utility_guide = UTILITY;

class Lineup extends React.Component {
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
    const roleOptions = (this.props.type === "ATTACK" ? (
      attackRoles.map((option, index) => {
        return <option key={index}>{option}</option>
      })
    ) : (
      defenderRoles.map((option, index) => {
        return <option key={index}>{option}</option>
      })
    ));
    const roles = (this.props.type === "ATTACK" ? (
      ATTACKER_ROLES
    ) : (
      DEFENDER_ROLES
    ));
    const operators = (this.props.type === "ATTACK" ? (
      ATTACKER_OPERATORS
    ) : (
      DEFENDER_OPERATORS
    ));

    const lineup = this.props.roles.map((role, index) => {
      const i = index;
      const operatorOptions = (this.props.roles[index] !== "ROLE" ? (
        operators[this.props.roles[index]].map((operator, index) => {
          if (this.props.operators.indexOf(operator) < 0 || this.props.operators.indexOf(operator) === i) {
            return <option key={index}>{operator.toUpperCase()}</option>
          }
        })
      ) : "");
      const utilityOptions = (this.props.type === "ATTACK" ? (
        utility_guide.attack[this.props.operators[index]].map((gadget, index) => {
          return <option key={index}>{gadget}</option>
        })
      ) : (
        utility_guide.defense[this.props.operators[index]].map((gadget, index) => {
          return <option key={index}>{gadget}</option>
        })
      ));
      return (
        <div className={"role" + (this.props.activeOperator === index ? " role--active" : "")} key={index}>
          <div className="role__head">
            { this.props.activeOperator === index ? (
              <div className="role__options">
                <select className="form__select" onChange={(e) => { this.props.updateRoles(e, index) }} value={this.props.roles[index]}>
                  { roleOptions }
                </select>
                <select className="form__select" onChange={(e) => { this.props.updateOperators(e, index) }} value={this.props.operators[index]} disabled={this.props.roles[index] === "ROLE"}>
                  <option>OPERATOR</option>
                  { operatorOptions }
                </select>
                <div className="role__utility">
                  <select className="form__select" onChange={(e) => { this.props.updateUtility(e, index) }} value={this.props.utility[index]}>
                    <option>UTILITY</option>
                    { utilityOptions }
                  </select>
                </div>
              </div>
            ) : (
              <div className="role__options">
                <p className="role__role">Role: {this.props.roles[index]}</p>
                <p className="role__utility">Utility: {this.props.utility[index]}</p>
              </div>
            )}
            <div className="role__image" onClick={() => { this.props.selectOperator(index) }}>
              <p>{this.props.operators[index]}</p>
              <img className="role__image" src={`../../media/min/operators/${this.props.operators[index]}.png`}
                onClick={() => {
                  if (this.props.activeOperator === index) {
                    this.props.insertOperator(this.props.activeOperator);
                  } else {
                    this.props.selectOperator(index);
                  }
                }}/>
            </div>
          </div>

          { this.props.activeOperator === index ? (
            <div className="role__body">
              <div>
                { this.props.gadgets[index].gadget && this.props.gadgets[index].count !== 0 ? (
                  <div className="role__gadget">
                    <p>{this.props.gadgets[index].gadget} ({this.props.gadgets[index].count - this.props.gadgetPositions[index].length})</p>
                    <img className="role__gadget-image" src={`../../media/min/gadgets/${this.props.gadgets[index].gadget.toUpperCase().replace(" ", "_").replace(" ", "_")}.png`}
                      onClick={() => {
                        if (this.props.gadgets[index].count - this.props.gadgetPositions[index].length> 0) {
                          this.props.insertGadget(index)
                        }
                      }}/>
                  </div>
                ) : ""}
              </div>
              <div>
                { this.props.utility[index] && this.props.utility[index] !== "UTILITY" ? (
                  <div className="role__utility">
                    <p>{this.props.utility[index]} ({UTILITY_GUIDE[this.props.utility[index]] - this.props.utilityPositions[index].length})</p>
                    <img className="role__utility-image" src={`../../media/min/utility/${this.props.utility[index].toUpperCase().replace(" ", "_")}.png`}
                      onClick={() => {
                        if (UTILITY_GUIDE[this.props.utility[index]] - this.props.utilityPositions[index].length) {
                          this.props.insertUtility(index);
                        }
                      }}/>
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

export default Lineup;
