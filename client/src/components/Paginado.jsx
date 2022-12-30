import React from "react";
//import { useDispatch, useSelector } from "react-redux";

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
    
    const pageNumber =[];

    for (let i = 1; i<=Math.ceil(allCountries/countriesPerPage); i++) {
         pageNumber.push(i)
    }
    return (
        <div>
            {
            pageNumber && pageNumber.map(number => (
                <button key={number} onClick={() => paginado(number)}>{number}</button>
            ))
            }
        </div>
    )
      
}