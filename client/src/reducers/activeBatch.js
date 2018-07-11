import { FETCH_BATCH } from "../actions/batch";
import { ADD_STUDENT } from "../actions/students";
import { DELETE_STUDENT } from "../actions/students";

const batch = {};
const student = [];

export default function(state = batch, action) {
  switch (action.type) {
    case FETCH_BATCH:
      return action.payload;

    case ADD_STUDENT:
      return action.payload;

    case DELETE_STUDENT:
      return student.filter(student => student.id !== action.payload);

    default:
      return state;
  }
}
