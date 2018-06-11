import { FETCH_BATCH } from "../actions/batch";
import { ADD_BATCH } from "../actions/batch";

const batch = {};

export default function(state = batch, action) {
  switch (action.type) {
    case FETCH_BATCH:
      return action.payload;

    case ADD_BATCH:
      return action.payload;

    default:
      return state;
  }
}
