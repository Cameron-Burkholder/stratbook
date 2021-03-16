/* client/components/partials/DefendersForm.js */

import React from "react";

import Loading from "./Loading.js"
import { DEFENDERS } from "../../data.js";

/*
  @func: DefendersForm
  @desc: render defenders form
  @prop onSubmit: function
  @prop onChange: function
  @prop defenders: Array
  @prop errors: Object
  @prop loading: Boolean
*/
const DefendersForm = (props) => {
  const defender_buttons = DEFENDERS.map((defender, index) => {
    return (
      <div className="defenders-form__defender" key={index}>
        <input onChange={() => { props.onChange(defender); } } className={"defenders-form__input " + (props.defenders.indexOf(defender) >= 0 ? "defenders-form__input--checked" : "")} type="checkbox" id={"defenders-form__defender--" + defender.toLowerCase()} checked={props.defenders.indexOf(defender) >= 0}/>
        <label className="defenders-form__label" htmlFor={"defenders-form__defender--" + defender.toLowerCase()}>
          <img className="defenders-form__image" alt={defender + " Image"} src={`../../media/min/operators/${defender.toLowerCase()}.png`}/>
        </label>
      </div>
    )
  });
  return (
    <form className="form" id="set-defenders-form" onSubmit={props.onSubmit}>
      <fieldset className="form__fieldset" id="defenders-field">
        <div>
          <p className="form__label">Preferred Defenders</p>
            { defender_buttons }
          <span className="form__error">{(props.errors ? props.errors.defenders : "")}</span>
          <button className="form__button form__button--submit" type="submit">Save</button>
        </div>
      </fieldset>
    </form>
  )
}

export default DefendersForm;
