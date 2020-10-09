/* client/components/partials/OperatorStatistics.js */

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
const OperatorStatistics = (props) => {
  return (
    <div className="operator-statistics">
      <div className="operator-info">
        <img className="operator-info__image" alt="Operator" src={props.image}/>
        <h3 className="operator-info__name">{props.name}</h3>
      </div>
      <div className="operator-stats">
        <div className="operator-stats__stat">
          <p className="operator-stats__label">K/D</p>
          <span className="operator-stats__value">{props.kd}</span>
        </div>
        <div className="operator-stats__stat">
          <p className="operator-stats__label">Kills</p>
          <span className="operator-stats__value">{props.kills}</span>
        </div>
        <div className="operator-stats__stat">
          <p className="operator-stats__label">Deaths</p>
          <span className="operator-stats__value">{props.deaths}</span>
        </div>
        <div className="operator-stats__stat">
          <p className="operator-stats__label">W/L</p>
          <span className="operator-stats__value">{props.wl}</span>
        </div>
        <div className="operator-stats__stat">
          <p className="operator-stats__label">Wins</p>
          <span className="operator-stats__value">{props.wins}</span>
        </div>
        <div className="operator-stats__stat">
          <p className="operator-stats__label">Losses</p>
          <span className="operator-stats__value">{props.losses}</span>
        </div>
        <div className="operator-stats__stat">
          <p className="operator-stats__label">Playtime</p>
          <span className="operator-stats__value">{Math.round(props.playtime / 3600 * 100) / 100} Hrs</span>
        </div>
        <div className="operator-stats__stat">
          <p className="operator-stats__label">Headshot %</p>
          <span className="operator-stats__value">{Math.round(props.hsp * 100 * 100) / 100}%</span>
        </div>
      </div>
    </div>
  )
}

export default OperatorStatistics;
