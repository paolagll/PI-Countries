const initialState = {
    countries : [],
    countriesList:[],
    detail:[]
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES':
         return {
            ...state,
            countries: action.payload,
            countriesList: action.payload,
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
            const allCountries = state.countriesList
            const continentFiltered = action.payload === 'All' ? allCountries:allCountries.filter(e => e.continent === action.payload)
            return{
               ...state,
                countries : continentFiltered,
                loaded: false,
            }

        default: return state;
    }
};


export default rootReducer;