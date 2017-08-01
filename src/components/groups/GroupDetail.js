import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getGroup } from "../../actions/Group";
import GroupDetailList from "./GroupDetailList";

class GroupDetail extends Component {
  componentWillMount() {
    this.props.getGroup(this.props.match.params.id);
  }
  render() {
    return (
      <div className="">
        <GroupDetailList group={this.props.group} />
      </div>
    );
  }
}

GroupDetail.propTypes = {
  getGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

function myStateToProps(state, ownProps) {
  console.log(ownProps);
  return {
    group:
      state.Groups &&
      state.Groups.length > 0 &&
      state.Groups
        .filter(a => a._id === ownProps.match.params.id)
        .reduce(a => a),
    loading: state.App.isLoading,
    errors: state.App.errors
  };
}

export default connect(myStateToProps, { getGroup })(GroupDetail);
