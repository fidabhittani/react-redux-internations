import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { fetchGroups } from "../../actions/Group";
import { saveUser } from "../../actions/User";
import AddUserForm from "./AddUserForm";
import moment from "moment";
import { isError } from "../../actions/App";
import { validateAddUser } from "../../Validations/user/add-user-form";
class AddUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
    username: "",
    dob: moment(),
    loading: false,
    errors: {},
    done: false,
    groups: []
  };

  componentDidMount() {
    this.props.fetchGroups();
  }

  handleChange = e => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ [e.target.name]: e.target.value, errors });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    console.log(this.state.errors);
  };
  handleGroupChange = groups => {
    this.setState({ groups });
  };
  handleDateChange = date => {
    this.setState({
      dob: date
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { errors, isValid } = validateAddUser(this.state);
    this.setState({ errors });
    if (isValid) {
      const groups = this.state.groups;
      const { firstName, lastName, email, username, dob, avatar } = this.state;
      let promise = this.props.saveUser({
        firstName,
        lastName,
        email,
        username,
        dob,
        avatar,
        groups
      });
      if (promise) {
        promise.then(
          () => {
            this.setState({ done: true });
          },
          err => {
            err.response.json().then(({ errors }) => {
              if (errors && !!errors.groups) {
                errors.selectedGroup = true;
              }

              if (errors && !!errors.global) {
                err.dispatch(isError([errors.global]));
              }
              this.setState({ errors });
            });
          }
        );
      }
    }
  };

  render() {
    return (
      <div className="">
        {!!this.state.done
          ? <Redirect to="/user" />
          : <AddUserForm
              form={this.state}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleGroupChange={this.handleGroupChange}
              groupOptions={this.props.groupOptions}
              handleDateChange={this.handleDateChange}
              handleAvatarChange={this.handleAvatarChange}
              errors={this.props.errors}
            />}
      </div>
    );
  }
}

AddUser.propTypes = {
  groupOptions: PropTypes.array.isRequired
};

function myStateToProps(state) {
  return {
    groups: state.Groups,
    errors: state.App.errors,
    groupOptions:
      state.Groups &&
      state.Groups.length > 0 &&
      state.Groups.map(group => {
        return { label: group.name, value: group._id, clearableValue: false };
      })
  };
}

export default connect(myStateToProps, { saveUser, fetchGroups })(AddUser);
