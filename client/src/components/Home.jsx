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
import logo from '../images/globo.PNG'



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
        <div className="containhome">
            <div className="navbar">
                <Link to = '/' className="logo" >
                 <img src={logo} alt = 'logo' className="globo"/>
                </Link>
                <h1 className="title">The countries of the world</h1>
                <SearchBar/>
            </div>
           
            <div className='container_country'>
                
                <div className="container_filters">
                    <Filter/>
                    <button className="reset" onClick={e=> {handleClick(e)}}>
                        Reset
                    </button>
                    <Link to= '/activities' className="button_activity">
                        <button  className="button_create">Create Activity</button> 
                    </Link>
                </div>
                
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
                : <div><span class="loader"></span> <p>Loading</p> </div>
                }
                </div>
            </div>
            <Pagination/>
        </div>
    )
}