import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterCountriesByContinent, orderByName, orderByPopulation, getActivities, filterByActivity } from "../actions";
import { useState, useEffect } from "react";
import '../styles/filters.css'

export default function Filter(){
    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)
    const currentPage = useSelector((state) => state.currentPage)
    const indexOfFirstCountry = useSelector((state)=> state.firstPostIndex)
    const indexOfLastCountry = useSelector((state)=> state.lastPostIndex)
    const currentCountries = allCountries.slice(currentPage === 1 ? 0 : indexOfFirstCountry, currentPage === 1? 9 : indexOfLastCountry)
    const myActivities = useSelector((state)=> state.Activities)

    useEffect (()=>{
        dispatch(getCountries());
    }, [dispatch])

    useEffect(()=>{
        dispatch(getActivities());
    }, [dispatch])

    //------------ Handlers ---------------//
    const [order, setOrder] = useState('');
    const [orderP, setOrderPopulation] = useState('');
    let actyName = []
    
    for (let i = 0; i < myActivities.length; i++) {
        if(myActivities[i].name){
            actyName.push(myActivities[i].name)
        }
    }
    //Filter Continent
    function handleFilterContinent(e){
        //e.preventDefault();
        dispatch(filterCountriesByContinent(e.target.value));
    }

    //Filter Activity
    function handleFilterActivity(e){
        //e.preventDefault();
        dispatch(filterByActivity(e.target.value));
        console.log('myActivities',myActivities)
        console.log('actyname',actyName)
    }

    //Order by Name
    function handleOrder(e){
       // e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrder(`Sort ${e.target.value}`);
        console.log(e.target.value) // mododifica el estado local y se renderiza
    }

    //Order by Population
    function handleOrderPopulation(e){
        //e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setOrderPopulation(`Order ${e.target.value}`);
        console.log(e.target.value)
    }


    return (
        
        <div className="select">
             {/* order */}
             <select defaultValue={'default'} onChange={e => handleOrder(e)}>
                    <option value="default" disabled>Alphabetic order</option>
                    <option value="A → Z">A → Z</option>
                    <option value="Z → A">Z → A</option>
                </select>
                <select defaultValue={'default'} onChange={e => handleOrderPopulation(e)} >
                    <option value="default" disabled>Population</option>
                    <option value="HIGHER">Low → High</option>
                    <option value="LOWER">High → Low</option>
                </select>
                {/* filter by continent */}
                <select defaultValue={'All'} onChange={e => handleFilterContinent(e)}>
                    <option value="All">All</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Antarctica">Antartica</option>
                    <option value="South America">South America</option>
                    <option value="North America">North America</option>
                    <option value="Oceania">Oceania</option>
                </select>
                {/* filter by activity */}
                <select defaultValue={'default'} name='activities' onChange={e => handleFilterActivity(e)} >
                    <option value="default" disabled>Select activity</option>
                    {myActivities.map(a=>(
                            <option value={a.name}>{a.name}</option>
                        ))}
                </select>
        </div>
    )
}

