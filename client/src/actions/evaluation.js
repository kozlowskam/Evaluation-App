import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const GET_EVALUATION = "GET_EVALUATION";
export const GET_ALL_EVALUATIONS = "GET_ALL_EVALUATIONS";
export const ADD_EVALUATION = "ADD_EVALUATION";
export const UPDATE_EVALUATION = "UPDATE_EVALUATION";

export const getEvaluation = evaluationId => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/evaluations/${evaluationId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: GET_EVALUATION,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

export const addEvaluation = evaluation => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/evaluations`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(evaluation)
    .then(response =>
      dispatch({
        type: ADD_EVALUATION,
        payload: response.body
      })
    );
};

export const updateEvaluation = (evaluationId, updates) => (
  dispatch,
  getState
) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .put(`${baseUrl}/evaluations/${evaluationId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(updates)
    .then(response =>
      dispatch({
        type: UPDATE_EVALUATION,
        payload: response.body
      })
    );
};
