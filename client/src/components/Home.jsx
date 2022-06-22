import React from "react";
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import { getDogs,OrdenPorPeso,OrdenPorNombre,FiltradoPorTemperaments,getTemperaments,FiltradoPorBD,FiltradoPorPeso} from "../actions";
import Card from "./Card";
import Paginado from "./Paginas_N";
import Buscar from "./Buscador";
import NavBar from "./NavBar";
import "./Home_.css";
export default function Home (){
    const dispatch = useDispatch();
    const dogs = useSelector((state)=>state.Dogs)
    const temperaments = useSelector(state => state.Temperaments);
    const [orden,setOrden]= useState(1)
    const [currentPage,setCurrentPage]= useState(1)
    const [DogsPorPagina,setDogsPorPagina]=useState(8)
    const indexDeLaUltimaDogs = currentPage*DogsPorPagina
    const indexDeLaPrimeraDogs = indexDeLaUltimaDogs - DogsPorPagina
    const currentDogs = dogs.slice(indexDeLaPrimeraDogs,indexDeLaUltimaDogs)
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTemperaments());
    },[dispatch])
    
    function handleOrdenAlfabetico(e){
        e.preventDefault();
        dispatch(OrdenPorNombre(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleOrdenPeso(e){
        e.preventDefault();
        dispatch(OrdenPorPeso(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleFiltroPeso(e){
        e.preventDefault();
        dispatch(FiltradoPorPeso(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleFiltroTemperaments(e){
        e.preventDefault();
        dispatch(FiltradoPorTemperaments(e.target.value));
        setCurrentPage(1);
        setOrden(`filtrado ${e.target.value}`)
    }
    function handleFiltroBD(e){
        e.preventDefault();
        dispatch(FiltradoPorBD(e.target.value));
        setCurrentPage(1);
        setOrden(`filtrado ${e.target.value}`)
    }
    function returnToFirstPage() {
        setCurrentPage(1)
    };
    return currentDogs.length > 0 ? (
        <div>
            <NavBar/>
            <div className="selecterContainer">
            <Buscar returnToFirstPage={returnToFirstPage}/>
            <select onChange={e=>handleOrdenAlfabetico(e)} defaultValue='default' className="filters">
                    <option value="default" disabled >Orden alfabético</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
            </select>
            <select onChange={e=>handleOrdenPeso(e)} defaultValue='default' className="filters">
                    <option value="default" disabled >Orden por Peso </option>
                    <option value="Descendente">Descendente</option>
                    <option value="Ascendente">Ascendente</option>
            </select>
            <select onChange={e=>handleFiltroBD(e)} defaultValue='default' className="filters">
                    <option value="default" disabled >Base de datos</option>
                    <option value="si">si</option>
                    <option value="no">no</option>
            </select>
            <select onChange={e=>handleFiltroPeso(e)} defaultValue='default' className="filters">
                    <option value="default" disabled >Filtro peso </option>
                    <option value="si">Max_50</option>
                    <option value="no">Men_50</option>
            </select>
            <select onChange={e=>handleFiltroTemperaments(e)} defaultValue='default' className="filters">
                    <option value="default" disabled >Filtro de temperaments</option>
                    {
                        temperaments && temperaments.map(temperament => (
                            
                            <option value={temperament} key={temperament}>{temperament}</option>
                        ))
                    }
            </select>
            </div>
            <div>
                <div className="lista">
                {
                    currentDogs && currentDogs.map(el=>(
                        <Card nombre={el.nombre} id={el.id} peso={el.peso}  
                        temperaments={!el.createdInDb?el.temperaments
                            :el.temperaments.map((x) =>
                             x.name.concat(" ")).join(", ") 
                        }
                         image={el.image} createdInDb={el.createdInDb} key={el.id}/>
                    ))
            }
            </div>
            <Paginado 
            DogsPorPagina={DogsPorPagina}
            cantidad={dogs.length}
            paginado={paginado}
            currentPage={currentPage}
            />
            </div>
        </div>
    ): 
    <div className="Cargando">
        <h1 className="Cargando_h1"> Cargando </h1>
        <img className="Cargando_gif" alt="Cargando..." src="https://i.pinimg.com/originals/f8/97/e2/f897e2e871ed90d572f23b0539397432.gif" />
    </div>
}