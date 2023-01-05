import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div className='container'>
            <h1>Welcome!</h1>
            <Link to = '/home'>
                <button>Let's Go!</button>
            </Link>
        </div>
    );
}