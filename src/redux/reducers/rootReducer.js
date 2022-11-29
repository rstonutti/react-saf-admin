import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { shoppingReducer } from "./shoppingReducer";
import { stockReducer } from "./stockReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  shopping: shoppingReducer,
  stock: stockReducer,
});
