import { GET_STUDENTEVALUATION } from "../actions/evaluations";

export default function(state = [], action) {
  switch (action.type) {
    case GET_STUDENTEVALUATION:
      return action.payload;

    default:
      return state;
  }
}
