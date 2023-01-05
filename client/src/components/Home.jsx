import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getCountries} from "../actions";
import { Link } from 'react-router-dom';
import CountryCard from './Card';
import '../styles/home.css';
import SearchBar from "./SearchBar";
import Pagination from "./Paginado";
import Detail from "./Detail";
import Filter from "./Filters";



export default function Home (){
    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)
    const currentPage = useSelector((state) => state.currentPage)
    const indexOfFirstCountry = useSelector((state)=> state.firstPostIndex)
    const indexOfLastCountry = useSelector((state)=> state.lastPostIndex)
    const currentCountries = allCountries.slice(currentPage === 1 ? 0 : indexOfFirstCountry, currentPage === 1? 9 : indexOfLastCountry)

    //state for order
    const [order, setOrder] = useState('');
    const [orderP, setOrderPopulation] = useState('');

    //Traigo los countries al montar
    useEffect (()=>{
        dispatch(getCountries());
    }, [dispatch])

    //------------ Handlers ---------------//
    //reset all countries
    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
        setOrder("");
        setOrderPopulation("");
    }

    return (
        <div >
            <Link to = '/home'>Countries</Link>
            <h1>The countries of the world</h1>
            <button onClick={e=> {handleClick(e)}}>
                Reset
            </button>
            <div className=''>
                
                <Filter/>
                <SearchBar/>
                <Link to= '/activities'>
                <button  className="buttons-home">Create Activity</button> 
                </Link>
                <div key='cards' className='cardsCountries '>
                {
                currentCountries.length > 0 ? currentCountries.map((c) => {
                    return (
                    <div key={c.name} className="card"> 
                    <Link to={`/home/${c.id}`}>
                    <CountryCard 
                    flag={c.flag}
                    name={c.name}
                    continent={c.continent}
                    key = {c.id}
                    id = {c.id}
                /> </Link></div>  )})
                : <p>Loading...</p>
                }
                </div>
                
                <Pagination/>

            </div>
        </div>
    )
}