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
        };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                // currentPage: action.payload,
                // previousPage: action.payload-1,
                // nextPage: action.payload+1, 
                // firstPostIndex: (postPerPage* (action.payload-1)),
                // lastPostindex: postPerPage*action.payload,
                page: action.payload
            };
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.countriesList
            const continentFiltered = action.payload === 'All' ? allCountries:allCountries.filter(e => e.continent === action.payload)
            return{
               ...state,
                countries : continentFiltered,
            };
        case 'ORDER_BY_NAME':
            action.payload === "A → Z" ? state.countries.sort(function(a, b){
                if (a.name > b.name) { return 1;}
                if (b.name > a.name) {return -1;}
                return 0;
            }):
            state.countries.sort(function(a, b){
                if (a.name > b.name) {return -1;}
                if (b.name > a.name) {return 1;}
                return 0;
            })
            return{
                ...state,
            };
        case 'ORDER_BY_POPULATION':
            action.payload === "HIGHER"? 
              state.countries.sort((a, b) => a.population - b.population):
              state.countries.sort((a, b) => b.population - a.population);
            return {
              ...state,
            };
            

        default: return state;
    }
};


export default rootReducer;