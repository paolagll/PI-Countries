import axios from 'axios';

export function getCountries(){
    return async function(dispatch){
        let countries = await axios.get ('http://localhost:3001/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: countries.data,
        })
    }
}