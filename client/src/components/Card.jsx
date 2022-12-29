import React from "react";


export default function CountryCard({ name, flag, continent }) {
    return (
      <div className={styles.card}>
        <img src={flag} alt={`${name} flag`} className={styles.flag} />
        <div className={styles.captions}>
          <h4>{name}</h4>
          <h5 className={styles.continent}>{continent}</h5>
        </div>
      </div>
    );
};