import * as request from "superagent";

const baseUrl = "http://localhost:4000";

export const GET_EVALUATION = "GET_EVALUATION";
export const GET_ALL_EVALUATIONS = "GET_ALL_EVALUATIONS";
export const ADD_EVALUATION = "ADD_EVALUATION";
export const UPDATE_EVALUATION = "UPDATE_EVALUATION";

export const getEvaluation = evaluationId => dispatch => {
  request
    .get(`${baseUrl}/evaluations/${evaluationId}`)
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

  request
    .post(`${baseUrl}/evaluations`)
    .send(evaluation)
    .then(response =>
      dispatch({
        type: ADD_EVALUATION,
        payload: response.body
      })
    );
};

export const updateEvaluation = (evaluationId, updates) => dispatch => {
  request
    .put(`${baseUrl}/evaluations/${evaluationId}`)
    .send(updates)
    .then(response =>
      dispatch({
        type: UPDATE_EVALUATION,
        payload: response.body
      })
    );
};
