import * as request from "superagent";

const baseUrl = "http://localhost:4000";

export const GET_DET_STUDENT = "GET_DET_STUDENT";
export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS";
export const ADD_STUDENT = "ADD_STUDENT";
export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT";

export const getStudent = studentId => dispatch => {
  request
    .get(`${baseUrl}/students/${studentId}`)
    .then(response =>
      dispatch({
        type: GET_DET_STUDENT,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

export const addStudent = student => (dispatch, getState) => {
  const state = getState();

  request
    .post(`${baseUrl}/students`)
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

  request.delete(`${baseUrl}/students/${studentId}`).then(response =>
    dispatch({
      type: DELETE_STUDENT,
      payload: studentId
    })
  );
};
