import React from "react";
import '../styles/card.css';

//import {Link} from 'react-router-dom';

export default function CountryCard ({ name, flag, continent }) {
  return (
    // hacer Div con Link to
    <div className="container">
      <img className="flag" src={flag} alt={`${name} flag`} />
      <div>
        <h4>{name}</h4>
        <h5>{continent}</h5>
      </div>
    </div>
  );
};
