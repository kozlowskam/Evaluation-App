import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const GET_STUDENTEVALUATION = "GET_STUDENTEVALUATION";

export const getStudentEvaluation = studentId => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/evaluations/${studentId}`)
    .then(response =>
      dispatch({
        type: GET_STUDENTEVALUATION,
        payload: response.body.evaluation
      })
    )
    .catch(err => alert(err));
};
