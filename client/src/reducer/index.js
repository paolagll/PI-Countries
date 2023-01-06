const initialState = {
    countries : [],
    countriesList:[],
    details:[],
    page: 1,
    currentPage: 1,
    firstPostIndex: 0,
    lastPostIndex: 10,
    loaded:false,
    Activities: [],
    myActivities:[]
}
const countriesPerPage = 10;

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES':
         return {
            ...state,
            countries: action.payload,
            page:Math.ceil(action.payload.length/countriesPerPage),
            countriesList: action.payload,
            loaded: false,
        };
        case 'GET_NAME_COUNTRIES':
            return{
                ...state,
                loaded:true,
                countries: action.payload,
                page:Math.ceil(action.payload.length/countriesPerPage),
                currentPage: 1,
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
                previousPage: action.payload-1,
                nextPage: action.payload+1, 
                firstPostIndex: countriesPerPage * (action.payload - 1),
                lastPostIndex: countriesPerPage * action.payload,
            };
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.countriesList
            const continentFiltered = action.payload === 'All' ? allCountries:allCountries.filter(e => e.continent === action.payload)
            return{
               ...state,
                countries : continentFiltered,
                page:Math.ceil(continentFiltered.length / countriesPerPage),
                currentPage: 1,
            };
        case 'FILTER_BY_ACTIVITY':
            const allCountry = state.countriesList
            console.log('actividades', state.Activities)
            const activitiesFiltered = action.payload === 'default' ? allCountry: allCountry.filter(e => e.Activities && e.Activities.some(a=> a.name === action.payload))
            return{
               ...state,
                countries: activitiesFiltered,
                page:Math.ceil(activitiesFiltered.length / countriesPerPage),
                currentPage: 1,
            };
        case 'ORDER_BY_NAME':
            let countriesName = [...state.countries]
            let orName = []

            if(action.payload === "A → Z" ){
            orName = countriesName.sort(function(a, b){
                if (a.name > b.name) { return 1;}
                if (b.name > a.name) {return -1;}
                return 0;
            })}
            if(action.payload === "Z → A" ){
                orName =countriesName.sort(function(a, b){
                if (a.name > b.name) {return -1;}
                if (b.name > a.name) {return 1;}
                return 0;
            })}
            return{
                ...state,
                countries: orName,
                page:Math.ceil(orName.length / countriesPerPage),
                currentPage: 1,
            };
        case 'ORDER_BY_POPULATION':
            let countriesPop =  [...state.countries]
            action.payload === "HIGHER"? 
              countriesPop.sort((a, b) => a.population - b.population):
              countriesPop.sort((a, b) => b.population - a.population);
            return {
              ...state,
              countries:countriesPop,
              page:Math.ceil(countriesPop.length / countriesPerPage),
              currentPage: 1,
            };
        case "GET_DETAILS":
            return{
                ...state,
                details: action.payload
            };
        case 'GET_ACTIVITIES':
            return {
                ...state,
                Activities: action.payload
            };
        case 'POST_ACTIVITY':
            return{
                ...state,
            };
         
        default: return state;
    }
};


export default rootReducer;