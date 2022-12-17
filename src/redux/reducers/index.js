import { combineReducers } from "redux";
import statesReducer from "./states";
import countiesReducer from "./counties";


const rootReducer = combineReducers({
    statesReducer,
    countiesReducer
});

export default rootReducer;
