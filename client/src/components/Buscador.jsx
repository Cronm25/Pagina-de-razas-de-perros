import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { buscarpornombre } from "../actions";
import "./Buscador_.css"

export default function Buscador({returnToFirstPage}){
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');
    
    function handleChange(e){
        e.preventDefault();
        setNombre(e.target.value)
    };
    function handleButton(e){
        e.preventDefault();
        dispatch(buscarpornombre(nombre))
        .then(() =>{ returnToFirstPage(); })        
    };

    return (
        <div className="Container">
            <input className="Input" type="text" 
            placeholder='Raza' 
            onChange={(e) => handleChange(e)}/>
            <button className="Buscar" type='submit' onClick={ (e) => handleButton(e)} >Buscar</button>
        </div>
    )
}
