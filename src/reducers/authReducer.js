import { TYPES } from "../actions/authActions";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };
    case TYPES.CHECKING:
      return {
        ...state,
        checking: false,
      };
    case TYPES.LOGOUT:
      return {
        checking: false,
      };
    default:
      return state;
  }
};
