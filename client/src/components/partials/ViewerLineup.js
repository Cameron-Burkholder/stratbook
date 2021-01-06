/* client/src/components/partials/ViewerLineup.js */

import React from "react";
import { ATTACKER_ROLES, ATTACKER_OPERATORS, DEFENDER_ROLES, DEFENDER_OPERATORS, UTILITY_GUIDE, UTILITY } from "../../data.js";
const attackRoles = ATTACKER_ROLES;
const defenderRoles = DEFENDER_ROLES;
const utility_guide = UTILITY;

class ViewerLineup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const lineup = this.props.roles.map((role, index) => {
      return (
        <div className="role" key={index}>
          <div className="role__head">
            <div>
              <p className="role__role">Role: {this.props.roles[index]}</p>
              <p className="role__utility">Utility: {this.props.utility[index]}</p>
            </div>
          </div>
          <div className="role__image">
            <img className="role__image" src={`https://cdn.r6stats.com/badges/${this.props.operators[index].toLowerCase()}_badge.png`}/>
          </div>
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

export default ViewerLineup;
