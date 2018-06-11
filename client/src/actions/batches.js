import * as request from "superagent";

export const FETCH_ALL_BATCHES = "FETCH_ALL_BATCHES";

const baseUrl = "http://localhost:4000";

export const fetchAllBatches = () => dispatch => {
  request
    .get(`${baseUrl}/batches`)
    .then(response =>
      dispatch({
        type: FETCH_ALL_BATCHES,
        payload: response.body.batches
      })
    )

    .catch(err => alert(err));
};
