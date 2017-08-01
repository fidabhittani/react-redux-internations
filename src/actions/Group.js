import { handleResponse, isLoading, catchHandler } from "./App";

export const SET_GROUPS = "SET_GROUPS";
export const SET_GROUP = "SET_GROUP";
export const ADD_GROUP = "ADD_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";
export const UPDATE_GROUP = "UPDATE_GROUP";

export function setGroup(group) {
  return {
    type: SET_GROUP,
    group
  };
}
export function groupDeleted(groupId) {
  return {
    type: DELETE_GROUP,
    groupId
  };
}
export function setGroups(groups) {
  return {
    type: SET_GROUPS,
    groups
  };
}
export function addGroup(group) {
  return {
    type: ADD_GROUP,
    group
  };
}

export function fetchGroups() {
  return dispatch => {
    dispatch(isLoading(true));
    return fetch("/api/group")
      .then(data => handleResponse(data, dispatch))
      .then(data => {
        dispatch(setGroups(data ? data.groups : []));
        dispatch(isLoading(false));
      });
  };
}

export function saveGroup(data) {
  return dispatch => {
    return fetch("/api/group/create", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => handleResponse(response, dispatch))
      .then(data => dispatch(addGroup(data ? data.group : [])));
  };
}

export function getGroup(groupId) {
  return dispatch => {
    dispatch(isLoading(true));
    fetch("/api/group/" + groupId)
      .then(data => handleResponse(data, dispatch))
      .then(data => {
        dispatch(setGroup(data ? data.group : {}));
      })
      .catch(catchHandler);
  };
}

export function deleteGroup(groupId) {
  return dispatch => {
    return fetch("/api/group/" + groupId, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => handleResponse(response, dispatch))
      .then(data => dispatch(groupDeleted(data.id)));
  };
}
