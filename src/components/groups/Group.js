import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchGroups, deleteGroup, getGroup } from "../../actions/Group";
import GroupList from "./GroupList";

class UserGroup extends Component {
  componentWillMount() {
    this.props.fetchGroups();
  }
  render() {
    return (
      <div className="">
        <GroupList
          groups={this.props.groups}
          deleteGroup={this.props.deleteGroup}
          loading={this.props.loading}
          errors={this.props.errors}
          getGroup={getGroup}
        />
      </div>
    );
  }
}

UserGroup.propTypes = {
  fetchGroups: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired
};

function myStateToProps(state) {
  return {
    groups: state.Groups,
    loading: state.App.isLoading,
    errors: state.App.errors
  };
}

export default connect(myStateToProps, { fetchGroups, deleteGroup })(UserGroup);
