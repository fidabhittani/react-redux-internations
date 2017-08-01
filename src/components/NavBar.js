import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="topnav" id="myTopnav">
        <NavLink exact className="" activeClassName="active" to="/user">
          Users
        </NavLink>
        <NavLink className="" activeClassName="active" to="/user/groups">
          Groups
        </NavLink>
      </nav>
    );
  }
}

export default NavBar;
