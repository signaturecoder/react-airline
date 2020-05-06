import { combineReducers } from "redux";
import UpdateSelectedPaxIdReducer from "./PassengerReducer";

const rootReducer = combineReducers({
  paxSeatMap : UpdateSelectedPaxIdReducer
});

export default rootReducer;
