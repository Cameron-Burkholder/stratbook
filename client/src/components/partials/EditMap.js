/* client/components/partials/EditMap.js */

import React from "react";

import TypeSelector from "./TypeSelector.js";

const SITES = {
  "BANK": ["B Lockers/B CCTV Room", "2F Executive Lounge/2F CEO Office", "1F Teller's Office/1F Archives", "1F Staff Room/1F Open Area"]
};
const FLOORS = {
  "BANK": ["BASEMENT", "First Floor", "Second Floor"]
};
class EditMap extends React.Component {
  constructor(props) {
    super(props);

    this.updateType = this.updateType.bind(this);

    this.state = {
      map: this.props.map,
      sites: SITES[this.props.map],
      site: SITES[this.props.map][0],
      siteIndex: 0,
      strategyIndex: 0,
      strategies: this.props.map.attack,
      sceneIndex: 0,
      scenes: this.props.map.attack[0][SITES[this.props.map[0]]],
      floors: FLOORS[this.props.map],
      floorIndex: 0,
      type: "ATTACK",
    }
  }

  updateType(e) {
    if (e.target.value === "ATTACK") {
      this.setState({
        type: "ATTACK",
        site: this.state.sites[0],
        siteIndex: 0,
        strategies: this.props.map.attack,
        strategyIndex: 0,
        scenes: this.props.map.attack[0][this.state.sites[0]],
        sceneIndex: 0,
        floorIndex: 0
      });
    } else {
      this.setState({
        type: "DEFENSE",
        site: this.state.sites[0],
        siteIndex: 0,
        strategies: this.props.map.defense[this.state.sites[0]],
        strategyIndex: 0,
        scenes: this.props.map.defense[this.state.sites[0]].scenes,
        sceneIndex: 0,
        floorIndex: 0
      });
    }
  }
  render() {
    return (
      <div className="edit-map">
        <h2 className="edit-map__heading">{this.state.map}</h2>
        <TypeSelector updateType={this.updateType} type={this.state.type}/>
        <div className="edit-map__header">
          <div>
            {/* <SiteSelector/> */
            /* <StrategySelector/> */}
            <h3 className="edit-map__strategy-heading"></h3>
          </div>
          <div>
            {/* <Lineup/> */}
          </div>
        </div>
        <div className="edit-map__body">
          {/* <Blueprint/> */
          /* <Toolbar/> */}
        </div>
        {/* <Objectives/> */
        /* <Execution/> */}
      </div>
    )
  }
}
/*const EditMap = (props) => {
  const objectiveList = props.objectives.map((objective, index) => {
    return (
      <li className="objectives__item" key={index}>
        <span className="objectives__value">{objective}</span>
        <button onClick={() => { props.removeObjective(index) }} className="objectives__button">X</button>
      </li>
    )
  })
  return (
    <form className="form" id="update-strategy-form">
      <p className="strategy__link" onClick={props.exitStrategy}>Back to Strategies</p>
      <fieldset className="form__fieldset" id="name">
        <label className="form__label" htmlFor="name">Strategy Name</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.name == null ? "" : " form__input--error")} value={props.name} id="name" type="text" required/>
        <span className="form__error">{(props.errors ? props.errors.name : "")}</span>
      </fieldset>
      <fieldset className="form__fieldset" id="type">
        <label className="form__label" htmlFor="type">Type</label>
        <select onChange={props.onChange} className={"form__input" + (props.errors && props.errors.type == null ? "" : " form__input--error")} value={props.type} id="type" required>
          <option>ATTACK</option>
          <option>DEFENSE</option>
        </select>
        <span className="form__error">{(props.errors ? props.errors.type : "")}</span>
      </fieldset>
      <fieldset className="form__fieldset" id="objectives">
        <label className="form__label">Objectives</label>
        <input onChange={props.onChange} onKeyPress={(e) => { props.onKeyPress(e, props.getComponent()) }} className={"form__input" + (props.errors && props.errors.objectives == null ? "" : " form__input--error")} value={props.newObjective} id="newObjective" placeholder="New Objective" required/>
        <ul className="objectives">
          { objectiveList }
        </ul>
        <span className="form__error">{(props.errors ? props.errors.objectives : "")}</span>
      </fieldset>
      <fieldset className="form__fieldset" id="lineup">
        <label className="form__label">Lineup</label>
        { props.type === "ATTACK" ? (
          <AttackerLineupForm onChange={props.onChange} operators={props.operators} roles={props.roles} utility={props.utility}/>
        ) : (
          <DefenderLineupForm onChange={props.onChange} operators={props.operators} roles={props.roles} utility={props.utility}/>
        )}
      </fieldset>
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="execution">Execution</label>
        <textarea onChange={props.onChange} className={"form__input" + (props.errors && props.errors.execution == null ? "" : " form__input--error")} id="execution" value={props.execution} required></textarea>
        <span className="form__error">{(props.errors ? props.errors.execution : "")}</span>
      </fieldset>
      <button onClick={(e) => { props.onSubmit(e, props.index) }} className="form__button form__button--submit" type="button">Save</button>
    </form>
  )
}*/

export default EditMap;
