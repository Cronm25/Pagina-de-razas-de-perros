import React from "react";
import "./Card.css"
import { Link } from "react-router-dom";


export default function Card({ nombre, id,peso, temperaments, image, createdInDb}) {

    return (
                <div className="cardContainer">
                    <h1 className="cardTitle" >{nombre}</h1> 
                    <img src={image} alt="not found" width="200px" height= "210px" className="image" />
                    <ul className="cardDescription">{temperaments?temperaments.toString().replace(/\s+/g, '').split(",").sort().map(d => (<li key={d}>{d}</li>)):<li key={`${nombre}+${id}`}>Sin temperamentos</li>}<li key={peso}>Pesa : {peso} Kg</li></ul>
                    <div >
                        <Link to={'/recipe/' + id} className="Boton">
                        En detalle</Link>
                    </div>
                </div>
    )
}