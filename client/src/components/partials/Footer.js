/* client/components/partials/Footer.js */

import React from "react";

/*
  @func: Footer
  @desc: render footer
*/
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section">
        <a href="/terms">Terms and Conditions of Use</a>
      </div>
      <div className="footer__section">
        <p>&copy; Cameron Burkholder</p>
      </div>
      <div className="footer__section">
        <a href="/privacy">Privacy Policy</a>
      </div>
    </footer>
  );
}

export default Footer;
