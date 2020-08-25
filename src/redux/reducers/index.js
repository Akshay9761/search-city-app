import { combineReducers } from 'redux';
import allCities from './citiesReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  allCities,
  apiCallsInProgress
});

export default rootReducer;
