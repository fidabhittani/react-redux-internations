import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  fetchUsers,
  deleteUser,
  getUser,
  filterUser
} from "../../actions/User";
import UserList from "./UserList";

class User extends Component {
  state: {};
  constructor(props) {
    super(props);
    this.setState({
      filter: "",
      users: props.users
    });
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  filterList = event => {
    let filteredUsers = this.props.users.filter(function(item) {
      return (
        item.firstName
          .toLowerCase()
          .search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({
      filter: event.target.value,
      users: filteredUsers
    });
  };

  render() {
    return (
      <div className="">
        <UserList
          users={this.props.users}
          deleteUser={this.props.deleteUser}
          getUser={this.props.getUser}
          loading={this.props.loading}
          errors={this.props.errors}
          filterList={this.filterList}
        />
      </div>
    );
  }
}

User.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

function myStateToProps(state, props) {
  return {
    users: state.Users,
    loading: state.App.isLoading,
    errors: state.App.errors
  };
}

export default connect(myStateToProps, {
  fetchUsers,
  deleteUser,
  getUser,
  filterUser
})(User);
