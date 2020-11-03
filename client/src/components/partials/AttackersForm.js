/* client/components/partials/AttackersForm.js */

import React from "react";

import Loading from "./Loading.js"
import { ATTACKERS } from "../../data.js";

/*
  @func: AttackersForm
  @desc: render attackers form
  @prop onSubmit: function
  @prop onChange: function
  @prop attackers: Array
  @prop errors: Object
  @prop loading: Boolean
*/
const AttackersForm = (props) => {
  const attacker_buttons = ATTACKERS.map((attacker, index) => {
    return (
      <div className="attackers-form__attacker" key={index}>
        <input onChange={() => { props.onChange(attacker); } } className={"attackers-form__input " + (props.attackers.indexOf(attacker) >= 0 ? "attackers-form__input--checked" : "")} type="checkbox" id={"attackers-form__input--" + attacker.toLowerCase()} checked={props.attackers.indexOf(attacker) >= 0} key={index}/>
        <label className="attackers-form__label" htmlFor={"attackers-form__input--" + attacker.toLowerCase()}>
          <img className="attackers-form__image" alt={attacker + " Image"} src={"https://cdn.r6stats.com/badges/" + attacker.toLowerCase() + "_badge.png"}/>
        </label>
      </div>
    )
  });
  return (
    <form className="form" id="set-attackers-form" onSubmit={props.onSubmit}>
      <fieldset className="form__fieldset" id="attackers-field">
        <div>
          <p className="form__label">Preferred Attackers</p>
            { attacker_buttons }
          <span className="form__error">{(props.errors ? props.errors.attackers : "")}</span>
          <button className="form__button form__button--submit" type="submit">Save</button>
        </div>
      </fieldset>
    </form>
  )
}

export default AttackersForm;
