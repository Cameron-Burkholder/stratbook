/* client/src/components/partials/Toolbar.js */

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
    console.log(this.props);

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
        <div className="role" key={index}>
          <select className="form__select" onChange={(e) => { this.props.updateRoles(e, index) }} value={this.props.roles[index]}>
            { roleOptions }
          </select>
          <select className="form__select" onChange={(e) => { this.props.updateOperators(e, index) }} value={this.props.operators[index]} disabled={this.props.roles[index] === "ROLE"}>
            <option>OPERATOR</option>
            { operatorOptions }
          </select>
          <select className="form__select" onChange={(e) => { this.props.updateUtility(e, index) }} value={this.props.utility[index]}>
            <option>UTILITY</option>
            { utilityOptions }
          </select>
        </div>
      )
    })
    return (
      <div className="lineup">
        { lineup }
      </div>
    )
  }
}

export default Lineup;
