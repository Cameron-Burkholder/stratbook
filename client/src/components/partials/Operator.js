/* client/components/partials/Operator.js */

import React from "react";

/*
  @func: Operator
  @desc: render operator
  @prop image: String
  @prop name: String
  @prop kd: String
  @prop kills: String
  @prop deaths: String
  @prop wl: String
  @prop wins: String
  @prop losses: String
  @prop playtime: String
  @prop hsp: float
*/
const Operator = (props) => {
  return (
    <div className="operator">
      <img className="operator-image" alt="Operator Image" src={props.image}/>
      <h3 className="operator-name">{props.name}</h3>
      <div className="operator-stats">
        <p className="operator-stat">{props.kd} KD</p>
        <p className="operator-stat">{props.kills} Kills</p>
        <p className="operator-stat">{props.deaths} Deaths</p>
        <p className="operator-stat">{props.wl} WL Ratio</p>
        <p className="operator-stat">{props.wins} Wins</p>
        <p className="operator-stat">{props.losses} Losses</p>
        <p className="operator-stat">{Math.round(props.playtime / 3600 * 100) / 100} Hours</p>
        <p className="operator-stat">Headshot Percentage: {Math.round(props.hsp * 100 * 100) / 100}%</p>
      </div>
    </div>
  )
}

export default Operator;
