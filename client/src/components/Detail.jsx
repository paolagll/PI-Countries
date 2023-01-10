import React from "react";
import { Link , useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from '../actions/index';
import { useEffect } from "react";
import '../styles/detail.css'


export default function Detail() {
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();

  const { id } = useParams();

  const actividad = useSelector((state) => state.Activities);

  useEffect(() => {
    dispatch(getDetail(id));
    console.log(details)
  }, [id]);

  return (
    <div className="details">
      <Link to="/home" className="linkback">
        <button className="bbackd">Back</button>
      </Link>
      {details ?  
        <div className="details_container">
          <div >
            <img src={details.flag} className="img" alt="Bandera del Pais" />
          </div>
          <div className="card-detail">
            <h1>Name: {details.name}</h1>
            <h2>Capital: {details.capital}</h2>
            <h2>Continent: {details.continent}</h2>
            <h2>Area: {details.area} km²</h2>
            <h2>Population: {details.population}</h2>
          </div>
        </div>
       : (
        <div><p>error detail...</p></div>
      )} 

     
      <div className="activities-cards">
          {details.Activities && Object.keys(details.Activities).length > 0? (
              <h2>Activities:</h2>
            ) : (
            <div><p>There isn't activities</p></div>
            )}
        <div className="container_activities">
          {details.Activities?.map(e => (
              <div className="flip-card">
                <ul className="flip-card-inner">
                  <div className="flip-card-front">
                    <h3>{e.name}</h3>
                  </div>
                  <div className="flip-card-back">
                   <h3>Difficulty: {e.difficulty}</h3>
                    <h3>Duration: {e.duration}</h3>
                    <h3>Season: {e.season}</h3>
                  </div>
                </ul>
              </div>
            ))}
          </div>
        </div>
    </div> 
  )
}