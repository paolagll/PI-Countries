import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actualPage,getNameCountries, getCountries } from '../actions/index';
import '../styles/Paginado.css'

// VAMOS PAO VOS PODES YO CONFIO EN VOS  :D

export default function Pagination() {
    let CountriesPage = useSelector((state) => state.page);
    const currentPage = useSelector((state) => state.currentPage);
    const allCountries = useSelector((state) => state.countries)
    const search = useSelector((state)=>state.loaded);//25
    let totalPages = CountriesPage
    const dispatch = useDispatch();
 
  let searchCountries = getCountries();

    if(search){
        searchCountries = getNameCountries()
    }

    useEffect(()=>{
        dispatch(searchCountries) 
    },[dispatch])

    const page =[]
    while (CountriesPage > 0) {
      page.unshift(CountriesPage);
      CountriesPage = CountriesPage - 1;
    }

  
    return (
      <div className='pagination' key='buttons'>
        <button key='previous'
          className="button"
          disabled={currentPage === 1 ? true : false} onClick={() => {
            dispatch(actualPage(currentPage - 1))}} >
          Previous
        </button>
        {"  "}

        {page.map((e) => (
          <>
            <button key='principal'
              className={
                currentPage === e? "button-principal": currentPage + 4 >= e && currentPage - 4 <= e? "button" : "button-false"
              }
              onClick={() => {
                dispatch(actualPage(e))}}
            >
              {e}
            </button>
            {"  "}
          </>
        ))}
        <button key='next'
          className="button"
          disabled={currentPage === totalPages ? true : false}
          onClick={() => {
            dispatch(actualPage(currentPage + 1))}}>
          Next
        </button>
      </div>
    );
  }
  