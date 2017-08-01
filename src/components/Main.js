import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import User from "./user/User";
import AddUser from "./user/AddUser";
import UserDetail from "./user/UserDetail";
import GroupDetail from "./groups/GroupDetail";

import UserGroup from "./groups/Group";
import AddGroup from "./groups/AddGroup";

import { isLoading } from "../actions/App";

class Main extends Component {
  componentWillMount() {}
  render() {
    return (
      <div className="main">
        <div className="main-header">
          <h2>Welcome Admin...!</h2>
          <p>What would you like to do today</p>
          {this.props.loading && <div className="loading">Loading&#8230;</div>}
        </div>

        <div className="main-content">
          <Route exact path="/user" component={User} />
          <Route exact path="/user/add" component={AddUser} />
          <Route exact path="/user/details/:id" component={UserDetail} />

          <Route exact path="/user/groups" component={UserGroup} />
          <Route exact path="/group/add" component={AddGroup} />
          <Route exact path="/group/details/:id" component={GroupDetail} />
        </div>
      </div>
    );
  }
}

function myStateToProps(state) {
  return {
    loading: state.App.isLoading
  };
}

export default withRouter(connect(myStateToProps, { isLoading })(Main));
