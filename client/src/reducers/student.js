import { ADD_STUDENT } from "../actions/students";
import { DELETE_STUDENT } from "../actions/students";
import { UPDATE_STUDENT } from "../actions/students";
import { GET_DET_STUDENT } from "../actions/students";

const student = [];

export default function(state = student, action) {
  switch (action.type) {
    case ADD_STUDENT:
      return action.payload;

    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.payload);

    case UPDATE_STUDENT:
      if (action.payload.id === state.id) {
        return action.payload;
      } else return state;

    case GET_DET_STUDENT:
      return action.payload;

    default:
      return state;
  }
}
