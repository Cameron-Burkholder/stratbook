/* client/components/partials/Header.js */

import React from "react";

/*
  @func: Header
  @desc: render header element with custom title and subtitle
  @prop title: String
  @prop subtitle: String
*/
const Header = (props) => {
  return (
    <header className="header" style={{
      background: 'url("../media/min/header_background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="header__overlay">
        <h1 className="header__title">{props.title}</h1>
        <h2 className="header__subtitle">{props.subtitle}</h2>
      </div>
    </header>
  )
}

export default Header;
