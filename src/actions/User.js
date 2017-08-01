import { handleResponse, isLoading, catchHandler } from "./App";

export const SET_USERS = "SET_USERS";
export const SET_USER = "SET_USER";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const FILTER_USERS = "FILTER_USERS";

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}
export function filterUserStore(value) {
  return {
    type: FILTER_USERS,
    value
  };
}
export function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}
export function userDeleted(userId) {
  return {
    type: DELETE_USER,
    userId
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}
export function updateUserStore(user) {
  return {
    type: UPDATE_USER,
    user
  };
}

export function fetchUsers() {
  return dispatch => {
    dispatch(isLoading(true));
    fetch("/api/user")
      .then(data => handleResponse(data, dispatch))
      .then(data => {
        const users = data ? data.users : [];
        dispatch(setUsers(users));
      })
      .catch(catchHandler);
  };
}
export function getUser(userId) {
  return dispatch => {
    dispatch(isLoading(true));
    fetch("/api/user/" + userId)
      .then(data => handleResponse(data, dispatch))
      .then(data => {
        dispatch(setUser(data ? data.user : {}));
      })
      .catch(catchHandler);
  };
}

export function deleteUser(userId) {
  return dispatch => {
    return fetch("/api/user/" + userId, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => handleResponse(response, dispatch))
      .then(data => dispatch(userDeleted(data.id)));
  };
}
export function saveUser(data) {
  return dispatch => {
    return fetch("/api/user/create", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => handleResponse(response, dispatch))
      .then(data => dispatch(addUser(data ? data.user : [])));
  };
}
export function filterUser(value) {
  return dispatch => {
    dispatch(filterUserStore(value));
  };
}
export function updateUser(data) {
  return dispatch => {
    return fetch(`/api/user/${data._id}`, {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => handleResponse(response, dispatch))
      .then(data => dispatch(updateUserStore(data ? data.user : [])));
  };
}
