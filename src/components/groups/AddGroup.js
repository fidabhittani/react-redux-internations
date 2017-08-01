import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { fetchUsers } from "../../actions/User";
import { saveGroup } from "../../actions/Group";
import AddGroupForm from "./AddGroupForm";
import { isError } from "../../actions/App";
import { validateAddGroup } from "../../Validations/group/add-group-form";
class AddGroup extends Component {
  state = {
    name: "",
    image: "",
    users: [],
    errors: {},
    done: false
  };

  componentDidMount() {
    this.props.fetchUsers();
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
  handleUserChange = users => {
    console.log(users);
    this.setState({ users });
  };
  handleDateChange = date => {
    this.setState({
      dob: date
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const { errors, isValid } = validateAddGroup(this.state);
    this.setState({ errors });
    if (isValid) {
      const users = this.state.users;
      const { name, image } = this.state;
      let promise = this.props.saveGroup({
        name,
        image,
        users
      });
      if (promise) {
        promise.then(
          () => {
            this.setState({ done: true });
          },
          err => {
            err.response.json().then(({ errors }) => {
              if (errors && !!errors.users) {
                errors.users = true;
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
          ? <Redirect to="/user/groups" />
          : <AddGroupForm
              form={this.state}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleUserChange={this.handleUserChange}
              userOptions={this.props.userOptions}
              errors={this.props.errors}
            />}
      </div>
    );
  }
}

AddGroup.propTypes = {
  usersOptions: PropTypes.array.isRequired
};

function myStateToProps(state) {
  return {
    users: state.Users,
    errors: state.App.errors,
    userOptions:
      state.Users &&
      state.Users.length > 0 &&
      state.Users.map(user => {
        return {
          label: user.firstName + " " + user.lastName,
          value: user._id,
          clearableValue: false
        };
      })
  };
}

export default connect(myStateToProps, { saveGroup, fetchUsers })(AddGroup);
