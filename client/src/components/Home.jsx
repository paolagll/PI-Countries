import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getCountries } from "../actions";
import { Link } from 'react';
import {CountryCard} from './Card';

export default function Home (){
    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)

    useEffect (()=>{
        dispatch(getCountries());
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    return (
        <div>
            <Link to = '/countries'>Countries</Link>
            <h1>The countries of world</h1>
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
                <select>
                    <option value="All">All</option>
                    <option value="AMERICA">America</option>
                    <option value="ASIA">Asia</option>
                    <option value="EUROPE">Europe</option>
                    <option value="AFRICA">Africa</option>
                </select>
                {/* filter by activity */}
                <select>
                    <option value="ACTIVITY">Activity</option>
                </select>
                {
                    allCountries?.map(c =>{
                        <CountryCard
                        name={c.name}
                        flag={c.flag}
                        continent={c.continent}/>
                    })
                }
            </div>
        </div>
    )
}