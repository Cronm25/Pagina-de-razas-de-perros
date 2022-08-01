import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"
export default function LandingPage(){
    return(
        <div className="landing">
            <a href="https://imgbb.com/"><img src="https://i.ibb.co/Cbqj1c0/15.png" alt="15" border="0" /></a>
            <h1 className="tittle">Razas de perros</h1>
            <Link to = "/home">
            <button class="myButton">Descubrir</button>
            </Link>
        </div>
    )
        
    
}