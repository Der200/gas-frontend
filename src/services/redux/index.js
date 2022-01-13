import { combineReducers } from "redux";
import orderSlice from "./order-slice/order-slice";
import authorizationSlice from "./authorization-slice/authorization-slice";

const rootReducer = combineReducers({
  order: orderSlice,
  authorization: authorizationSlice,
})

export default rootReducer