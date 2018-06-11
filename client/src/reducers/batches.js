import { FETCH_ALL_BATCHES } from "../actions/batches";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ALL_BATCHES:
      return action.payload;

    default:
      return state;
  }
}

// const student = {};

// export default function(state = student, action) {
//   switch (action.type) {
//     case ADD_QUESTION:
//       return action.payload;

//     default:
//       return state;
//   }
// }
