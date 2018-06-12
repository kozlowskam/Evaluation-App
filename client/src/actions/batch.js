import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const FETCH_BATCH = "FETCH_BATCH";
export const ADD_BATCH = "ADD_BATCH";

export const fetchBatch = batchId => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/batches/${batchId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: FETCH_BATCH,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

export const addBatch = batch => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/batches`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(batch)
    .then(response =>
      dispatch({
        type: ADD_BATCH,
        payload: response.body
      })
    );
};
