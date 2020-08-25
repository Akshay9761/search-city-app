import * as types from './actionTypes';
import * as citiesApi from '../api/api';
import debounce from '../../common/Js/debounce';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadAllCitiesSuccess(cities) {
  return { type: types.LOAD_CITIES_SUCCESS, cities: cities.data };
}

export function setCurrentPage(currentPage) {
  return { type: types.SET_CURRENT_PAGE, currentPage: currentPage };
}

export function searchCityText (searchText) {
  return { type: types.SEARCH_CITIES_SUCCESS, searchText };
}

const searchCityDebounce = debounce((dispatch, searchText) => {
  dispatch(searchCityText(searchText))
}, 100);

export function searchCity(searchText) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return searchCityDebounce(dispatch, searchText);
  };
}

export function removeShortListCitySuccess(cityId) {
  return { type: types.REMOVE_CITIES_FROM_SHORTLIST_SUCCESS, id: cityId };
}

const removeShortListCityDebounce = debounce((dispatch, cityId) => {
  dispatch(removeShortListCitySuccess(cityId))
}, 100);

export function removeShortListCity(cityId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return removeShortListCityDebounce(dispatch, cityId);
  };
}

export function shortListCitySuccess(cityId) {
  return { type: types.SHORTLIST_CITIES_SUCCESS, id: cityId };
}

const shortListCityDebounce = debounce((dispatch, cityId) => {
  dispatch(shortListCitySuccess(cityId))
}, 100);

export function shortListCity(cityId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return shortListCityDebounce(dispatch, cityId);
  };
}

export function removeAllCitySuccess(cityId) {
  return { type: types.REMOVE_CITIES_FROM_ALL_SUCCESS, id: cityId };
}

const removeCityDebounce = debounce((dispatch, cityId) => {
  dispatch(removeAllCitySuccess(cityId))
}, 100);

export function removeCity(cityId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return removeCityDebounce(dispatch, cityId);
  };
}

export function toggleModal(value) {
  return {type: 'TOGGLE_MODAL_SUCCESS', modal: value};
}

export function addNewCitySuccess(newCity) {
  return { type: types.ADD_NEW_CITY_SUCCESS, payload: newCity };
}

const addNewCitydebounce = debounce((dispatch, newCity) => {
  dispatch(addNewCitySuccess(newCity))
}, 100);

export function addNewCity(newCity) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return addNewCitydebounce(dispatch, newCity);
  };
}

export function loadAllCities() {
  return function(dispatch) {
    dispatch(beginApiCall())
    return citiesApi
      .getAllCities()
      .then(cities => {
        dispatch(loadAllCitiesSuccess(cities));
      })
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

