/* client/components/partials/CreateStrategyForm.js */

import React from "react";

import AttackerLineupForm from "./AttackerLineupForm.js";

/*
  @func: CreateStrategyForm
  @desc: render create strategy form
  @prop onSubmit: function

*/
const CreateStrategyForm = (props) => {
  const objectiveList = props.objectives.map((objective, index) => {
    return (
      <li className="objectives__item" key={index}>
        <span className="objectives__value">{objective}</span>
        <button onClick={() => { props.removeObjective(index) }} className="objectives__button">X</button>
      </li>
    )
  })
  return (
    <form className="form" id="create-strategy-form" onSubmit={props.onSubmit}>
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
      </fieldset>
      <fieldset className="form__fieldset" id="objectives">
        <label className="form__label">Objectives</label>
        <input onChange={props.onChange} onKeyPress={(e) => { props.onKeyPress(e, props.getComponent()) }} className={"form__input" + (props.errors && props.errors.objectives == null ? "" : " form__input--error")} value={props.newObjective} id="newObjective" placeholder="New Objective" required/>
        <ul className="objectives">
          { objectiveList }
        </ul>
      </fieldset>
      <fieldset className="form__fieldset" id="lineup">
        <label className="form__label">Lineup</label>
        { props.type === "ATTACK" ? (
          <AttackerLineupForm onChange={props.onChange} operators={props.operators} roles={props.roles}/>
        ) : (
          <div>def</div>
        )}
      </fieldset>
      <fieldset className="form__fieldset">
        <label className="form__label" htmlFor="execution">Execution</label>
        <textarea onChange={props.onChange} className={"form__input" + (props.errors && props.errors.execution == null ? "" : " form__input--error")} id="execution" value={props.execution} required></textarea>
      </fieldset>
      <button onClick={props.onSubmit} className="form__button form__button--submit">Create</button>
    </form>
  )
}

export default CreateStrategyForm;
