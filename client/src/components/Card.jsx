import React from "react";


export default function CountryCard ({ name, flag, continent }) {
  return (
    <div>
      <img src={flag} alt={`${name} flag`} />
      <div>
        <h4>{name}</h4>
        <h5>{continent}</h5>
      </div>
    </div>
  );
};
