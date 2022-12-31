import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getCountries, filterCountriesByContinent } from "../actions";
import { Link } from 'react-router-dom';
import CountryCard from './Card';
import Paginado from "./Paginado";

export default function Home (){
    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)


    const [currentPage, setCurrentPage] = useState (1)  //declaro la pagina actual
    const [countriesPerPage, setCountriesPerPage] = useState (10) //
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage (pageNumber)
    }

    //Traigo los countries al montar
    useEffect (()=>{
        dispatch(getCountries());
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    }
    
    function handleFilterContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
    }

    return (
        <div>
            <Link to = '/home'>Countries</Link>
            <h1>The countries of the world</h1>
            <button onClick={e=> {handleClick(e)}}>
                Load all countries
            </button>
            <div>
                {/* order alphabetic */}
                <select>
                    <option value="A → Z">A → Z</option>
                    <option value="Z → A">Z → A</option>
                </select>
                {/* order for population*/}
                <select>
                    <option value="All">None</option>
                    <option value="HIGHER">Low → High</option>
                    <option value="LOWER">High → Low</option>
                </select>
                {/* filter by continent */}
                <select onChange ={e => handleFilterContinent(e)}>
                    <option value="All">All</option>
                    <option value="America">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Antartica">Antartica</option>
                    <option value="South America">South America</option>
                    <option value="North America">North America</option>
                    <option value="Oceania">Oceania</option>
                </select>
                {/* filter by activity */}
                <select>
                    <option value="ACTIVITY">Activity</option>
                </select>
                <div className='CardsCountries'>
                {
                currentCountries.length > 0 ? currentCountries.map((c) => {
                    return (
                    <CountryCard 
                flag={c.flag}
                name={c.name}
                continent={c.continent}
                key = {c.id}
                />)})
                : <p>Loading...</p>
                }
                </div>
                
                <Paginado 
                countriesPerPage={countriesPerPage}
                allCountries={allCountries?.length}
                paginado ={paginado}
                 />

            </div>
        </div>
    )
}