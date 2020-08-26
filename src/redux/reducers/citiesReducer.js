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

const getTotalCityPerPage = (currentPage, itemsPerPage = 1000, allCity) => {
  return allCity.slice((currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage);
}

const getSearchedCities = (allCity, searchText) => {
  return allCity.filter(
    city =>
      city.City.toLowerCase().includes(searchText.toLowerCase()) ||
      city.District.toLowerCase().includes(searchText.toLowerCase()) ||
      city.State.toLowerCase().includes(searchText.toLowerCase())
  );
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
      let computedCities = getTotalCityPerPage(state.currentPage, 
        state.ITEMS_PER_PAGE, allCity);

      let stateDistrict = getStateDistrictObj(allCity);

      return {
        ...state, allCities: allCity, totalCities: computedCities,
        totalItems: action.cities.length, stateDistrict: stateDistrict
      };

    case types.SET_CURRENT_PAGE:
      let curPaginationCities = getTotalCityPerPage(action.currentPage, 
        state.ITEMS_PER_PAGE, state.allCities);
      
      return { ...state, currentPage: action.currentPage, totalCities: curPaginationCities };

    case types.SEARCH_CITIES_SUCCESS:
      if (action.searchText) {
        let citiesComputed = getSearchedCities(state.allCities, action.searchText)

        return { ...state, currentPage: 1, totalCities: citiesComputed, totalItems: citiesComputed.length, search: action.searchText };
      } else {
        let citiesComputed = getTotalCityPerPage(state.currentPage,
          state.ITEMS_PER_PAGE, state.allCities);

        return { ...state, allCities: state.allCities, totalItems: state.allCities.length, totalCities: citiesComputed, search: '' };
      }

    case types.REMOVE_CITIES_FROM_ALL_SUCCESS:
      let allCitiesRemove = state.allCities.filter(city => city.id !== action.id);

      let shortlistedCitiesRemoveAll = state.shortlistedCities && state.shortlistedCities.length
        && state.shortlistedCities.filter(city => city.id !== action.id);

      let citiesComputedAfterRemove;
      if (state.search) {
        citiesComputedAfterRemove = getSearchedCities(allCitiesRemove, state.search)
        
      } else {
        citiesComputedAfterRemove = getTotalCityPerPage(state.currentPage,
          state.ITEMS_PER_PAGE, allCitiesRemove);
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
        totalShortListedCities = getSearchedCities(allCitiesShortlist, state.search);
      } else {
        totalShortListedCities = getTotalCityPerPage(state.currentPage,
          state.ITEMS_PER_PAGE, allCitiesShortlist);
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

      let removeTotalShortListedCities = getTotalCityPerPage(state.currentPage,
        state.ITEMS_PER_PAGE, allCitiesShorltistRemove);

      return {
        ...state, allCities: allCitiesShorltistRemove, totalCities: removeTotalShortListedCities,
        shortlistedCities: shortlistedCitiesRemove
      };


    case types.TOGGLE_MODAL_SUCCESS:
      return { ...state, showModal: action.modal }


    case types.ADD_NEW_CITY_SUCCESS:
      let newAllCities = [action.payload, ...state.allCities];

      let newTotalShortListedCities = getTotalCityPerPage(state.currentPage,
        state.ITEMS_PER_PAGE, newAllCities);

      return {
        ...state, allCities: newAllCities, totalCities: newTotalShortListedCities,
        totalItems: newAllCities.length, search: ''
      };

    default:
      return state;
  }
}
