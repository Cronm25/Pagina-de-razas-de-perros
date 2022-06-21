import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetalle } from "../actions";
import NavBar from "./NavBar";
import "./Detalles_.css"

export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getDetalle(id));
    }, [dispatch, id]);

    const Dog_ = useSelector(state => state.Detalle)
    console.log(Dog_);
    return Dog_.image?(<div>
        <NavBar/>
        <div className="component">
            
                    <div>
                        <h1 className="title">{Dog_.nombre}</h1>
                        <div className="imgContainer">
                            <img src={Dog_.image} alt='dog image'
                                width="500px" height="400px" className="img" />
                        </div>
                        <div className="detailContainer">
                            <h3 className="h3">Altura: {Dog_.altura} cm</h3>
                            <h3 className="h3">Peso: {Dog_.peso} Kg</h3>
                            <h3 className="h3">Años de vida promedio: {Dog_.anios_de_vida}</h3>
                            <h3 className="h3">Temperamentos normales en dicha raza:</h3>
                                <ul className="p">{
                                     !Dog_.createdInDb                                                                                                         
                                     ?Dog_.temperaments.toString().replace(/\s+/g, '').split(",").sort().map(d => <li key={d} className="li">{d}</li>)
                                     :Dog_.temperaments.map(d => <li key={d.id} className="li">{d.name}</li>)
                                }</ul>
                        </div>
                    </div>      
        </div>
        </div>):<div className="Cargando">
        <h1 className="Cargando_h1"> Cargando </h1>
        <img className="Cargando_gif" alt="Cargando..." src="https://i.pinimg.com/originals/f8/97/e2/f897e2e871ed90d572f23b0539397432.gif" />
        </div>
    
};