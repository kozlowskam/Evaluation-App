import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const GET_STUDENT = "GET_STUDENT";
export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS";
export const ADD_STUDENT = "ADD_STUDENT";
export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT";

export const getStudent = studentId => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/students/${studentId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: GET_STUDENT,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

export const addStudent = student => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/students`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(student)
    .then(response =>
      dispatch({
        type: ADD_STUDENT,
        payload: response.body
      })
    );
};

export const deleteStudent = studentId => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .delete(`${baseUrl}/students/${studentId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: DELETE_STUDENT,
        payload: studentId
      })
    );
};

export const updateStudent = (studentId, updates) => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .put(`${baseUrl}/students/${studentId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(updates)
    .then(response =>
      dispatch({
        type: UPDATE_STUDENT,
        payload: response.body
      })
    );
};
