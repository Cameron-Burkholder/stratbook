/* client/src/components/partials/Viewer.js */

import React from "react";
import { clean } from "diacritic";
import { ATTACKER_ROLES, ATTACKERS, DEFENDER_ROLES, DEFENDERS, UTILITY_GUIDE, UTILITY } from "../../data.js";
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
    const operators = (this.props.type === "ATTACK" ? (
      ATTACKERS
    ) : (
      DEFENDERS
    ));
    const roles = (this.props.type === "ATTACK" ? (
      ATTACKER_ROLES
    ) : (
      DEFENDER_ROLES
    ));

    const lineup = this.props.operators.map((operator, index) => {
      const i = index;
      const operatorOptions = operators.map((op, index) => {
        if (this.props.operators.indexOf(op) < 0 || this.props.operators.indexOf(op) === i) {
          return <option key={index}>{op.toUpperCase()}</option>
        }
      });
      const utilityOptions = (this.props.type === "ATTACK" ? (
        utility_guide.attack[this.props.operators[index]].map((utility, index) => {
          return <option key={index}>{utility}</option>
        })
      ) : (
        utility_guide.defense[this.props.operators[index]].map((utility, index) => {
          return <option key={index}>{utility}</option>
        })
      ));
      return (
        <div className={"role" + (this.props.activeOperator === index ? " role--active" : "")} key={index}>
          <div className="role__head">
            { this.props.activeOperator === index ? (
              <div className="role__options">
                { this.props.function === "Editor" ? (
                  <select className="form__select" onChange={(e) => { this.props.updateOperators(e, index) }} value={this.props.operators[index]}>
                    <option>OPERATOR</option>
                    { operatorOptions }
                  </select>
                ) : (
                  ""
                )}
              <div className="role__utility">
                { this.props.function === "Editor" ? (
                  <select className="form__select" onChange={(e) => { this.props.updateUtility(e, index) }} value={this.props.utility[index]}>
                    <option>UTILITY</option>
                    { utilityOptions }
                  </select>
                ) : (
                  ""
                )}
              </div>
            </div>
            ) : (
              <div className="role__options">

              </div>
            )}
            <div className="role__image" onClick={() => { this.props.selectOperator(index) }}>
              <p>{this.props.operators[index]}</p>
              <img className="role__image" src={`../../media/min/operators/${clean(this.props.operators[index].toLowerCase())}.png`}
                alt="Operator"
                onClick={() => {
                  if (this.props.activeOperator === index && this.props.function === "Editor") {
                    this.props.insertOperator(this.props.activeOperator);
                  } else {
                    this.props.selectOperator(index);
                  }
                }}/>
              { this.props.activeOperator === index && this.props.function === "Editor" ? (
                <p style={{ fontSize: "8pt" }}>Click to insert</p>
              ) : "" }
            </div>
          </div>

          { this.props.activeOperator === index ? (
            <div className="role__body">
              <div>
                { this.props.gadgets[index].gadget && this.props.gadgets[index].count !== 0 ? (
                  <div className="role__gadget">
                    <p>{this.props.gadgets[index].gadget} ({this.props.gadgets[index].count - this.props.gadgetPositions[index].length})</p>
                    <img className="role__gadget-image" src={`../../media/min/gadgets/${this.props.gadgets[index].gadget.toUpperCase().replace(" ", "_").replace(" ", "_")}.png`}
                      alt="Operator Gadget"
                      onClick={() => {
                        if (this.props.function === "Editor" && this.props.gadgets[index].count - this.props.gadgetPositions[index].length> 0) {
                          this.props.insertGadget(index)
                        }
                      }}/>
                    { this.props.function === "Editor" ? (
                      <p style={{ fontSize: "8pt", textTransform: "none" }}>Click to insert</p>
                    ) : ""}
                  </div>
                ) : ""}
              </div>
              <div>
                { this.props.utility[index] && this.props.utility[index] !== "UTILITY" ? (
                  <div className="role__utility">
                    <p>{this.props.utility[index]} ({UTILITY_GUIDE[this.props.utility[index]] - this.props.utilityPositions[index].length})</p>
                    <img className="role__utility-image" src={`../../media/min/utility/${this.props.utility[index].toUpperCase().replace(" ", "_").replace(" ", "_")}.png`}
                      alt="Operator Utility"
                      onClick={() => {
                        if (this.props.function === "Editor" && UTILITY_GUIDE[this.props.utility[index]] - this.props.utilityPositions[index].length) {
                          this.props.insertUtility(index);
                        }
                      }}/>
                    { this.props.function === "Editor" ? (
                      <p style={{ fontSize: "8pt", textTransform: "none" }}>Click to insert</p>
                    ) : ""}
                  </div>
                ) : ""}
              </div>
            </div>
          ) : ""}
        </div>
      )
    });

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
