const initialState = {
    countries : [],
    firstPostIndex: 0,
    lastPostindex: 9,
    previousPage: 0,
    nextPage: 0,
    currentPage: 1,
    pages: 0
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES':
         return {
            ...state,
            countries: action.payload,
            loaded: false,
        }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                // currentPage: action.payload,
                // previousPage: action.payload-1,
                // nextPage: action.payload+1, 
                // firstPostIndex: (postPerPage* (action.payload-1)),
                // lastPostindex: postPerPage*action.payload,
                page: action.payload
            }
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.countries
            const continentFiltered = action.payload === 'ALL' ? allCountries:allCountries.filter(e => e.status === action.payload)
            return{
               ...state,
                countries : continentFiltered 
            };

        default: return state;
    }
};


export default rootReducer;