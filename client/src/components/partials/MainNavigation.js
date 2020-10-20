/* client/components/partials/MainNavigation.js */

import React from "react";
import { Link } from "react-router-dom";

/*
  @func: MainNavigation
  @desc: render navigation for contents of app
  @prop status: String
  @prop page: String
*/
const MainNavigation = (props) => {
  let contents;
  switch (props.page) {
    case "TEAM":
      contents = (
        <ul className="main-nav__body">
          <li className="main-nav__item">
            <Link className={"main-nav__link " + (props.active === "VIEW" ? "main-nav__link--active" : "")} to="/team">View</Link>
          </li>
          { props.status === "ADMIN" ? (
            <li className="main-nav__item">
              <Link className={"main-nav__link " + (props.active === "MANAGE" ? "main-nav__link--active" : "")} to="/team/manage">Manage</Link>
            </li>
          ) : ""
          }
        </ul>
      )
      break;
    case "STRATEGIES":
      contents = (
        <ul className="main-nav__body">
          <li className="main-nav__item">
            <Link className={"main-nav__link " + (props.active === "VIEW" ? "main-nav__link--active" : "")} to="/strategies">View</Link>
          </li>
          { props.status === "ADMIN" ? (
            <li className="main-nav__item">
              <Link className={"main-nav__link " + (props.active === "EDIT" ? "main-nav__link--active" : "")} to="/strategies/edit">Edit</Link>
            </li>
          ) : ""
          }
        </ul>
      )
      break;
    case "USER":
    case "DASHBOARD":
    case "CHAT":
    case "META":
    default:
      contents = "";
      break;
  }
  return (
    <nav className="main-nav">
      <ul className="main-nav__head">
        <li className={"main-nav__item " + (props.page === "DASHBOARD" ? "main-nav__item--active" : "")}>
          <Link className="main-nav__link" to="/dashboard">Dashboard</Link>
        </li>
        <li className={"main-nav__item " + (props.page === "TEAM" ? "main-nav__item--active" : "")}>
          <Link className="main-nav__link" to="/team">Team</Link>
        </li>
        { props.status ? (
          <li className={"main-nav__item " + (props.page === "STRATEGIES" ? "main-nav__item--active" : "")}>
            <Link className="main-nav__link" to="/strategies">Strategies</Link>
          </li>
        ) : "" }
        { props.status ? (
          <li className={"main-nav__item " + (props.page === "CHAT" ? "main-nav__item--active" : "")}>
            <Link className="main-nav__link" to="/chat">Chat</Link>
          </li>
        ) : "" }
        <li className={"main-nav__item " + (props.page === "META" ? "main-nav__item--active" : "")}>
          <Link className="main-nav__link" to="/meta">Meta</Link>
        </li>
      </ul>
      { contents }
    </nav>
  )
}

export default MainNavigation;
