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
        <img className="operator-image" alt="Operator Image" src={props.image}/>
        <h3 className="operator-name">{props.name}</h3>
      </div>
      <div className="operator-stats">
        <div className="operator-stat">
          <p className="stat-label">K/D</p>
          <span className="stat-value">{props.kd}</span>
        </div>
        <div className="operator-stat">
          <p className="stat-label">Kills</p>
          <span className="stat-value">{props.kills}</span>
        </div>
        <div className="operator-stat">
          <p className="stat-label">Deaths</p>
          <span className="stat-value">{props.deaths}</span>
        </div>
        <div className="operator-stat">
          <p className="stat-label">W/L</p>
          <span className="stat-value">{props.wl}</span>
        </div>
        <div className="operator-stat">
          <p className="stat-label">Wins</p>
          <span className="stat-value">{props.wins}</span>
        </div>
        <div className="operator-stat">
          <p className="stat-label">Losses</p>
          <span className="stat-value">{props.losses}</span>
        </div>
        <div className="operator-stat">
          <p className="stat-label">Playtime</p>
          <span className="stat-value">{Math.round(props.playtime / 3600 * 100) / 100} Hrs</span>
        </div>
        <div className="operator-stat">
          <p className="stat-label">Headshot %</p>
          <span className="stat-value">{Math.round(props.hsp * 100 * 100) / 100}%</span>
        </div>
      </div>
    </div>
  )
}

export default OperatorStatistics;
