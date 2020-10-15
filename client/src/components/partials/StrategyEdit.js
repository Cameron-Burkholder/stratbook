/* client/components/partials/Strategy.js */

import React from "react";
import Operator from "./Operator.js";

import AttackerLineupForm from "./AttackerLineupForm.js";
import DefenderLineupForm from "./DefenderLineupForm.js";

const StrategyEdit = (props) => {
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
}

export default StrategyEdit;
