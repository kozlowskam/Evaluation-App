import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const FETCH_ALL_BATCHES = "FETCH_ALL_BATCHES";

export const fetchAllBatches = () => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/batches`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: FETCH_ALL_BATCHES,
        payload: response.body.batches
      })
    )

    .catch(err => alert(err));
};
