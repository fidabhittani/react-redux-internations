import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUser, updateUser } from "../../actions/User";
import { fetchGroups, getGroup } from "../../actions/Group";
import UserDetailList from "./UserDetailList";

class UserDetail extends Component {
  assignGroup = params => {
    this.props
      .updateUser({
        _id: params.userId,
        groupId: params.groupId,
        assign: params.assign
      })
      .then(() => {
        this.props.getUser(params.userId);
        this.props.getGroup(params.groupId);
      });
  };
  componentWillMount() {
    this.props.getUser(this.props.match.params.id);
    this.props.fetchGroups();
  }
  render() {
    return (
      <div className="">
        <UserDetailList
          user={this.props.user}
          groups={this.props.groups}
          assignGroup={this.assignGroup}
        />
      </div>
    );
  }
}

UserDetail.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

function myStateToProps(state, ownProps) {
  return {
    user:
      state.Users &&
      state.Users.length > 0 &&
      state.Users
        .filter(a => a._id === ownProps.match.params.id)
        .reduce(a => a),

    loading: state.App.isLoading,
    errors: state.App.errors,
    groups: state.Groups
  };
}

export default connect(myStateToProps, {
  getUser,
  fetchGroups,
  updateUser,
  getGroup
})(UserDetail);
