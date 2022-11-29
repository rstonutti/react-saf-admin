import { TYPES } from "../types/types";

export const authInitialState = {
  checking: true,
};

export const authReducer = (state = authInitialState, action) => {
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
