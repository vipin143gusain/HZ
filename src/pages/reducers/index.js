import { combineReducers } from 'redux';
// import SearchNumReducer from '../Reducers/SearchReducer';
// import PolicyDashboardReducer from '../Reducers/PolicyDashboardReducer';
import customerReducer from '../reducers/customerReducers';
import offerReducer from '../reducers/offerReducers';

export default combineReducers({
  // SearchNumReducer,
  // PolicyDashboardReducer,
  customerReducer,
  offerReducer,
});
