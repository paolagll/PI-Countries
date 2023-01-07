import React from "react";
import {Link} from 'react-router-dom';
import background from '../images/canyonlake.jpeg';
import '../styles/landing.css'

export default function LandingPage(){
    return(
        <div className='landing'>
            <h1 className="welcome">Welcome!</h1>
            <h2 className="introduction">In this page you'll begin your travel around the world.</h2>
            <Link to = '/home'>
                <button className="buttonLanding">Let's Go!</button>
            </Link>
            
            
        </div>
    );
}