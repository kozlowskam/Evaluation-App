import { ADD_EVALUATION, GET_ALL_EVALUATIONS } from "../actions/evaluation";
import { UPDATE_EVALUATION } from "../actions/evaluation";
import { GET_EVALUATION } from "../actions/evaluation";
import { GET_EVALUATIONS } from "../actions/evaluation";

const evaluation = [];

export default function(state = evaluation, action) {
  switch (action.type) {
    case ADD_EVALUATION:
      return action.payload;

    case UPDATE_EVALUATION:
      if (action.payload.id === state.id) {
        return action.payload;
      } else return state;

    case GET_EVALUATION:
      return action.payload;

    case GET_ALL_EVALUATIONS:
      return action.payload;

    default:
      return state;
  }
}
