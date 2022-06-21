import React from "react";
import { Link } from "react-router-dom";
import "./NavBar_.css"

export default function NavBar() {
    return (
        <ul className="menu">
            <li><Link to='/home' className="a">Home  </Link> </li>
            <li><Link to='/create' className="a">Agrear raza</Link> </li>
        </ul>
    )
}