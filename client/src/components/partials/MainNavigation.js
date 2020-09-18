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
        <ul className="main-nav-body">
          <li className="main-nav-item">
            <Link className={"main-nav-link " + (props.active === "VIEW" ? "active-link" : "")} to="/team">View</Link>
          </li>
          { props.status === "ADMIN" ? (
            <li className="main-nav-item">
              <Link className={"main-nav-link " + (props.active === "MANAGE" ? "active-link" : "")} to="/team/manage">Manage</Link>
            </li>
          ) : ""
          }
        </ul>
      )
      break;
    case "STRATEGIES":
      contents = (
        <ul className="main-nav-body">
          <li className="main-nav-item">
            <Link className={"main-nav-link " + (props.active === "VIEW" ? "active-link" : "")} to="/strategies">View</Link>
          </li>
          { props.status === "ADMIN" || props.status === "EDITOR" ? (
            <li className="main-nav-item">
              <Link className={"main-nav-link " + (props.active === "EDIT" ? "active-link" : "")} to="/strategies/edit">Edit</Link>
            </li>
          ) : ""
          }
        </ul>
      )
      break;
    case "MAPS":
      contents = (
        <ul className="main-nav-body">
          <li className="main-nav-item">
            <Link className={"main-nav-link " + (props.active === "VIEW" ? "active-link" : "")} to="/maps">View</Link>
          </li>
          { props.status === "ADMIN" || props.status === "EDITOR" ? (
            <li className="main-nav-item">
              <Link className={"main-nav-link " + (props.active === "EDIT" ? "active-link" : "")} to="/maps/edit">Edit</Link>
            </li>
          ) : ""
          }
        </ul>
      )
      break;
    case "USER":
      contents = (
        <ul className="main-nav-body">
          <li className="main-nav-item">
            <Link className={"main-nav-link " + (props.active === "UPDATE_PLATFORM" ? "active-link" : "")} to="/user/update-platform">Update Platform</Link>
          </li>
          <li className="main-nav-item">
            <Link className={"main-nav-link " + (props.active === "UPDATE_USERNAME" ? "active-link" : "")} to="/user/update-username">Update Username</Link>
          </li>
          <li className="main-nav-item">
            <Link className={"main-nav-link " + (props.active === "UPDATE_EMAIL" ? "active-link" : "")} to="/user/update-email">Update Email</Link>
          </li>
          <li className="main-nav-item">
            <Link className={"main-nav-link " + (props.active === "UPDATE_PASSWORD" ? "active-link" : "")} to="/user/update-password">Update Password</Link>
          </li>
        </ul>
      );
      break;
    case "DASHBOARD":
    case "CHAT":
    case "META":
      contents = "";
      break;
  }
  return (
    <nav className="main-nav">
      <ul className="main-nav-head">
        <li className="main-nav-item">
          <Link className="main-nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="main-nav-item">
          <Link className="main-nav-link" to="/team">Team</Link>
        </li>
        <li className="main-nav-item">
          <Link className="main-nav-link" to="/strategies">Strategies</Link>
        </li>
        <li className="main-nav-item">
          <Link className="main-nav-link" to="/maps">Maps</Link>
        </li>
        <li className="main-nav-item">
          <Link className="main-nav-link" to="/chat">Chat</Link>
        </li>
        <li className="main-nav-item">
          <Link className="main-nav-link" to="/meta">Meta</Link>
        </li>
      </ul>
      { contents }
    </nav>
  )
}

export default MainNavigation;
