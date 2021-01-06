/* client/src/components/partials/Viewer.js */

import React from "react";
import { ATTACKER_ROLES, ATTACKER_OPERATORS, DEFENDER_ROLES, DEFENDER_OPERATORS, UTILITY_GUIDE, UTILITY } from "../../data.js";
const attackRoles = ATTACKER_ROLES;
const defenderRoles = DEFENDER_ROLES;
const utility_guide = UTILITY;

class Lineup extends React.Component {
  constructor(props) {
    super(props);
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
                <div>
                  <select className="form__select" onChange={(e) => { this.props.updateRoles(e, index) }} value={this.props.roles[index]}>
                    { roleOptions }
                  </select>
                  <select className="form__select" onChange={(e) => { this.props.updateOperators(e, index) }} value={this.props.operators[index]} disabled={this.props.roles[index] === "ROLE"}>
                    <option>OPERATOR</option>
                    { operatorOptions }
                  </select>
                </div>
              ) : (
                <div>
                  <p className="role__role">Role: {this.props.roles[index]}</p>
                  <p className="role__utility">Utility: {this.props.utility[index]}</p>
                </div>
              )}
            </div>
            <div className="role__image" onClick={() => { this.props.selectOperator(index) }}>
              <img className="role__image" src={`https://cdn.r6stats.com/badges/${this.props.operators[index].toLowerCase()}_badge.png`}/>
            </div>
            { this.props.activeOperator === index ? (
              <div className="role__body">
                <div className="role__operator">
                  <button className="insert" onClick={() => { this.props.insertOperator(this.props.activeOperator) }}>Insert Op</button>
                  <button className="remove" onClick={() => { this.props.removeOperator(this.props.activeOperator) }}>Remove Op</button>
                </div>
                <div className="role__gadget">
                  <p>{this.props.gadgets[index].gadget}</p>
                  <div className="button-container">
                    <button className="insert" onClick={() => { this.props.insertGadget(this.props.activeOperator) }}>+</button>
                    <button className="remove" onClick={() => { this.props.removeGadget(this.props.activeOperator) }}>-</button>
                  </div>
                </div>
                <div className="role__utility">
                  <select className="form__select" onChange={(e) => { this.props.updateUtility(e, index) }} value={this.props.utility[index]}>
                    <option>UTILITY</option>
                    { utilityOptions }
                  </select>
                  <div className="button-container">
                    <button className="insert" onClick={() => { this.props.insertUtility(this.props.activeOperator) }}>+</button>
                    <button className="remove" onClick={() => { this.props.removeUtility(this.props.activeOperator) }}>-</button>
                  </div>
                </div>
              </div>
            ) : ""}
          </div>
        )
    })
    return (
      <div className="lineup">
        <h3>Lineup</h3>
        { lineup }
      </div>
    )
  }
}

export default Lineup;
