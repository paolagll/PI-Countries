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

//Get name Countries
export function getNameCountries(name){
  return async function(dispatch){
    try {
      var json= await axios.get('http://localhost:3001/countries?name='+ name);
      return dispatch({
        type:'GET_NAME_COUNTRIES',
        payload: json.data,
      })
    } catch (error) {
      console.log(error)
    }
  } 
}

//Get Country Detail
export function getDetail(id){
  return async function(dispatch){
      try{
          var detail = await axios.get(`http://localhost:3001/countries/${id}`)
          return dispatch({
              type: "GET_DETAILS",
              payload: detail.data,
          })
      } catch(error) {
          console.log(error)
      }
  }
}

//Get activities
export function getActivities(){
  return async (dispatch) => {
      var json = await axios.get(`http://localhost:3001/activities`)
     return dispatch({ 
      type: 'GET_ACTIVITIES',
      payload: json.data})}
}

//Create Activity
export function postActivities(payload){
  return async function(dispatch){
    let json = await axios.post(`http://localhost:3001/activities`, payload);
    console.log(payload)
    return dispatch ({
      type: 'POST_ACTIVITY',
      payload: json,
    })
  }
} 

// Page
export const actualPage = (payload) => {
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



