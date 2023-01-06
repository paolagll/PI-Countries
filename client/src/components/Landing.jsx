import React from "react";
import {Link} from 'react-router-dom';
import background from '../images/canyonlake.jpeg';
import '../styles/landing.css'

export default function LandingPage(){
    return(
        <div className='landing'>
            <h1>Welcome!</h1>
            <Link to = '/home'>
                <button>Let's Go!</button>
            </Link>
            <div>
                <img></img>
            </div>
        </div>
    );
}