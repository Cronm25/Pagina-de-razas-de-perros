import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"
export default function LandingPage(){
    return(
        <div className="landing">
            <h1 className="tittle">Razas de perros</h1>
            <Link to = "/home">
            <button class="myButton">Descubrir</button>
            </Link>
        </div>
    )
        
    
}