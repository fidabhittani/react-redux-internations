import React, { Component } from "react";
import NavBar from "./NavBar";
class Header extends Component {
  render() {
    return (
      <div className="app-header">
        <img src="logo.png" alt="Internations" />
        <NavBar />
      </div>
    );
  }
}

export default Header;
