const initialState = {
    allCountries : []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES':
         return {
            ...state,
            allCountries: action.payload,
            countries: action.payload,
            loaded: false,
        };
    }
};


export default rootReducer;