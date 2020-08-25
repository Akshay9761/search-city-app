import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import create_UUID from '../../common/Js/uuid'

const getStateDistrictObj = (allCity) => {
  let stateDistrictObj = {};
  for (let cOb of allCity) {
    if (cOb.State in stateDistrictObj) {
      if (!stateDistrictObj[cOb.State].includes(cOb.District))
        stateDistrictObj[cOb.State] = [...stateDistrictObj[cOb.State], cOb.District]
    } else {
      stateDistrictObj[cOb.State] = [cOb.District]
    }
  }
  return stateDistrictObj;
}

export default function citiesReducer(state = initialState, action) {
  switch (action.type) {

    case types.LOAD_CITIES_SUCCESS:
      let allCity = action.cities.map((city, index) => {
        return {
          id: create_UUID() + index,
          ...city
        }
      });
      let computedCities = allCity.slice(
        (state.currentPage - 1) * state.ITEMS_PER_PAGE,
        (state.currentPage - 1) * state.ITEMS_PER_PAGE + state.ITEMS_PER_PAGE);

      let stateDistrict = getStateDistrictObj(allCity);

      return {
        ...state, allCities: allCity, totalCities: computedCities,
        totalItems: action.cities.length, stateDistrict: stateDistrict
      };

    case types.SET_CURRENT_PAGE:
      let curPaginationCities = state.allCities.slice(
        (action.currentPage - 1) * state.ITEMS_PER_PAGE,
        (action.currentPage - 1) * state.ITEMS_PER_PAGE + state.ITEMS_PER_PAGE);
      return { ...state, currentPage: action.currentPage, totalCities: curPaginationCities };

    case types.SEARCH_CITIES_SUCCESS:
      if (action.searchText) {
        let citiesComputed = state.allCities.filter(
          city =>
            city.City.toLowerCase().includes(action.searchText.toLowerCase()) ||
            city.District.toLowerCase().includes(action.searchText.toLowerCase()) ||
            city.State.toLowerCase().includes(action.searchText.toLowerCase())
        );
        return { ...state, currentPage: 1, totalCities: citiesComputed, totalItems: citiesComputed.length, search: action.searchText };
      } else {
        let citiesComputed = state.allCities.slice(
          (state.currentPage - 1) * state.ITEMS_PER_PAGE,
          (state.currentPage - 1) * state.ITEMS_PER_PAGE + state.ITEMS_PER_PAGE);
        return { ...state, allCities: state.allCities, totalItems: state.allCities.length, totalCities: citiesComputed, search: '' };
      }

    case types.REMOVE_CITIES_FROM_ALL_SUCCESS:
      let allCitiesRemove = state.allCities.filter(city => city.id !== action.id);

      let shortlistedCitiesRemoveAll = state.shortlistedCities && state.shortlistedCities.length
        && state.shortlistedCities.filter(city => city.id !== action.id);

      let citiesComputedAfterRemove;
      if (state.search) {
        citiesComputedAfterRemove = allCitiesRemove.filter(
          city =>
            city.City.toLowerCase().includes(state.search.toLowerCase()) ||
            city.District.toLowerCase().includes(state.search.toLowerCase()) ||
            city.State.toLowerCase().includes(state.search.toLowerCase())
        );
      } else {
        citiesComputedAfterRemove = allCitiesRemove.slice(
          (state.currentPage - 1) * state.ITEMS_PER_PAGE,
          (state.currentPage - 1) * state.ITEMS_PER_PAGE + state.ITEMS_PER_PAGE);
      }

      return {
        ...state, allCities: allCitiesRemove, shortlistedCities: shortlistedCitiesRemoveAll,
        totalItems: allCitiesRemove.length, totalCities: citiesComputedAfterRemove
      };

    case types.SHORTLIST_CITIES_SUCCESS:
      let allCitiesShortlist = state.allCities.map(city => {
        if (city.id === action.id) {
          return {
            ...city,
            shortlist: true
          }
        } else return city;
      });
      let shortlistCity = allCitiesShortlist.filter(city => city.id === action.id);

      let totalShortListedCities
      if (state.search) {
        totalShortListedCities = allCitiesShortlist.filter(
          city =>
            city.City.toLowerCase().includes(state.search.toLowerCase()) ||
            city.District.toLowerCase().includes(state.search.toLowerCase()) ||
            city.State.toLowerCase().includes(state.search.toLowerCase())
        );
      } else {
        totalShortListedCities = allCitiesShortlist.slice(
          (state.currentPage - 1) * state.ITEMS_PER_PAGE,
          (state.currentPage - 1) * state.ITEMS_PER_PAGE + state.ITEMS_PER_PAGE);
      }

      return {
        ...state, allCities: allCitiesShortlist, totalCities: totalShortListedCities,
        shortlistedCities: [...shortlistCity, ...state.shortlistedCities]
      };

    case types.REMOVE_CITIES_FROM_SHORTLIST_SUCCESS:
      let allCitiesShorltistRemove = state.allCities.map(city => {
        if (city.id === action.id) {
          return {
            ...city,
            shortlist: false
          }
        } else return city;
      });

      let shortlistedCitiesRemove = state.shortlistedCities.filter(city => city.id !== action.id);

      let removeTotalShortListedCities = allCitiesShorltistRemove.slice(
        (state.currentPage - 1) * state.ITEMS_PER_PAGE,
        (state.currentPage - 1) * state.ITEMS_PER_PAGE + state.ITEMS_PER_PAGE);

      return {
        ...state, allCities: allCitiesShorltistRemove, totalCities: removeTotalShortListedCities,
        shortlistedCities: shortlistedCitiesRemove
      };


    case types.TOGGLE_MODAL_SUCCESS:
      return { ...state, showModal: action.modal }


    case types.ADD_NEW_CITY_SUCCESS:
      let newAllCities = [action.payload, ...state.allCities];

      let newTotalShortListedCities = newAllCities.slice(
        (state.currentPage - 1) * state.ITEMS_PER_PAGE,
        (state.currentPage - 1) * state.ITEMS_PER_PAGE + state.ITEMS_PER_PAGE);

      return {
        ...state, allCities: newAllCities, totalCities: newTotalShortListedCities,
        totalItems: newAllCities.length, search: ''
      };

    default:
      return state;
  }
}
