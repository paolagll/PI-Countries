import axios from 'axios';


//Get Countries
export function getCountries(){
    return async function(dispatch){
        let countries = await axios.get ('http://localhost:3001/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: countries.data,
        })
    }
};

// Page
export const paging = (payload) => {
    return {
      type: 'SET_CURRENT_PAGE',
      payload,
    };
  };

// Filter Continent
export function filterCountriesByContinent(payload){
   return{
        type :'FILTER_BY_CONTINENT',
        payload,
   };
};

//Order by Name
export function orderByName(payload){
  return{
       type :'ORDER_BY_NAME',
       payload,
  };
};

//Order by population
export function orderByPopulation(payload){
  return{
       type :'ORDER_BY_POPULATION',
       payload,
  };
};

//Filter Activity
export function filterByActivity(payload){
  return{
    type:'FILTER_BY_ACTIVITY',
    payload,
  }
}