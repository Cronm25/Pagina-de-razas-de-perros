import React from "react";
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import {getTemperaments,postDogs } from "../actions";
import NavBar from "./NavBar";
import "./Formulario_.css";
function Validator(post){
    let errors={};
    if (!post.nombre) {
        errors.nombre = 'Ingresar nombre de la raza'
    }
    //////////////////////////////////////
    if(!post.alturaMax){
        errors.alturaMax = 'Ingresa un valor'
    }else if( Number(post.alturaMax)<=0){
        errors.alturaMax = 'El valor tiene que ser mayor a 0'
    }else if( Number(post.alturaMax) <=  Number(post.alturaMin)){
        errors.alturaMax = 'El valor tiene que ser mayor a la altura minima'
    }  
    //....................................
    if(!post.alturaMin){
        errors.alturaMin = 'Ingresa un valor'
    }else if( Number(post.alturaMin) <=0){
        errors.alturaMin = 'El valor tiene que ser mayor a 0'
    }  
    //////////////////////////////////////
    if(!post.pesoMax){
        errors.pesoMax = 'Ingresa un valor'
    }else if( Number(post.pesoMax)<=0){
        errors.pesoMax = 'El valor tiene que ser mayor a 0'
    }else if( Number(post.pesoMax) <=  Number(post.pesoMin)){
        errors.pesoMax = 'El valor tiene que ser mayor al peso minimo'
    } 
    //....................................
    if(!post.pesoMin){
            errors.pesoMin = 'Ingresa un valor'
    }else if( Number(post.pesoMin) <=0){
            errors.pesoMin = 'El valor tiene que ser mayor a 0'
    }
    //////////////////////////////////////
    if (!post.anios_de_vidaMax ) {
        errors.anios_de_vidaMax = 'Ingresa un valor'
    }else if( Number(post.anios_de_vidaMax)<=0){
        errors.anios_de_vidaMax = 'El valor tiene que ser mayor a 0'
    }else if( Number(post.anios_de_vidaMax) <  Number(post.anios_de_vidaMin)){
        errors.anios_de_vidaMax = 'El valor tiene que ser mayor a los años de vida minimos'
    }
    //....................................
    if (!post.anios_de_vidaMin ) {errors.anios_de_vidaMin = 'Ingresa un valor'
    }else if( Number(post.anios_de_vidaMin)<=0){
        errors.anios_de_vidaMin = 'El valor tiene que ser mayor a 0'
    }
    //////////////////////////////////////
    if (!post.image) {
        errors.image = 'Ingresar URL de alguna imagen representativa'
    }
    if (post.temperaments.length<1) {
        errors.temperaments = 'Elige al menos dos tipos de temperamentos'
    }
    return errors
}

export default function Formulario(){
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.Temperaments);
    const [errors,setErrors] = useState({});
    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])
    const[crear,setCrear]=useState({
        nombre:"",
        alturaMax:"",
        alturaMin:"",
        anios_de_vidaMax:"",
        anios_de_vidaMin:"",
        pesoMax:"",
        pesoMin:"",
        image:"",
        temperaments:[],
    })
    function handleCrear(e){   
        setCrear({
            ...crear,
            [e.target.name]:e.target.value
        });
        setErrors(Validator({
            ...crear,
            [e.target.name]:e.target.value
        }))
    }
    function handleComprobar(e){
        e.preventDefault();
        if(!crear.nombre||Object.keys(errors).length > 0){
            alert ("Campos incompletos")
        }else{
            dispatch(postDogs({
                nombre:crear.nombre,
                altura:`${crear.alturaMin} - ${crear.alturaMax}`,
                peso:`${crear.pesoMin} - ${crear.pesoMax}`,
                anios_de_vida:`${crear.anios_de_vidaMin} - ${crear.anios_de_vidaMax}`,
                image:crear.image,
                temperaments: crear.temperaments
            }));
            console.log({
                nombre:crear.nombre,
                altura:`${crear.alturaMin} - ${crear.alturaMax}`,
                peso:`${crear.pesoMin} - ${crear.pesoMax}`,
                anios_de_vida:`${crear.anios_de_vidaMin} - ${crear.anios_de_vidaMax}`,
                image:crear.image,
                temperaments: crear.temperaments
            })
            alert ('Raza creada');
        }
    };
    function handleSelector(e){
        if(e.target.value.length>0){
            setCrear({
                ...crear,
                temperaments:crear.temperaments.includes(e.target.value)?[...crear.temperaments]:[...crear.temperaments,e.target.value]
            });
        }else{
            setCrear({
                ...crear,
                temperaments:[...crear.temperaments]
            });
        }
        setErrors(Validator({
            ...crear,
            temperaments:[...crear.temperaments]
        }))
    }

    function handleEliminarTemperaments(t) {
        setCrear({
            ...crear,
            temperaments: crear.temperaments.filter(elemet => elemet !== t)
        })
        setErrors(Validator({
            ...crear,
            temperaments: [...crear.temperaments]
        }));

    };
    return (
        <div>
            <NavBar/>
        <div className="container">
            <div className="bkg">
            <div className="bkgcolor">
                <div className="form">
                    <h1>Agregar Raza</h1>  
                    <form onSubmit={e => handleComprobar(e)}> 
                        <label>       Nombre  </label>     
                        <div>
                            <input type="text" value={crear.nombre} name="nombre" onChange={e => handleCrear(e) }  />
                            { errors && errors.nombre ?
                             <p>{errors.nombre} </p> : null    }
                        </div>
                        <label>Altura </label>
                        <div className="MaxMin">
                            <label>Min: </label>
                            <input type="number" min="0" value={crear.alturaMin} name="alturaMin" onChange={e => handleCrear(e) }/>
                            {errors && errors.alturaMin ?
                                <p>{errors.alturaMin}</p> : null
                            }
                            <label>Max: </label>
                            <input type="number" min="0" value={crear.alturaMax} name="alturaMax" onChange={e => handleCrear(e) }/>
                            { errors && errors.alturaMax ?
                                <p>{errors.alturaMax}</p> : null
                            }  
                        </div>
                        <label>Peso </label>
                        <div className="MaxMin">
                            <label>Min: </label>
                            <input type="number" min="0" value={crear.pesoMin} name="pesoMin" onChange={e => handleCrear(e) }/>
                            {errors && errors.pesoMin ?
                                <p>{errors.pesoMin}</p> : null
                            }
                            <label>Max: </label>
                            <input type="number" min="0" value={crear.pesoMax} name="pesoMax" onChange={e => handleCrear(e) }/>
                            {errors && errors.pesoMax ?
                                <p>{errors.pesoMax}</p> : null
                            } 
                        </div>
                        <label>Esperanza de vida  </label>
                        <div className="MaxMin">
                            <label> Min: </label>
                            <input type="number" min="0" value={crear.anios_de_vidaMin} name="anios_de_vidaMin" onChange={e => handleCrear(e) }/>
                            {errors && errors.anios_de_vidaMin ?
                                <p>{errors.anios_de_vidaMin}</p> : null
                            }
                            <label> Max: </label>
                            <input type="number" min="0" value={crear.anios_de_vidaMax} name="anios_de_vidaMax" onChange={e => handleCrear(e) }/>
                            {errors &&  errors.anios_de_vidaMax ?
                                <p>{errors.anios_de_vidaMax}</p>: null
                            } 
                        </div>
                        <label>Imagen URL : </label>
                        <div>  
                            <input type="text" value={crear.image} name="image" onChange={e => handleCrear(e) }/>
                            {errors && errors.image ?
                                <p>{errors.image}</p> : null
                            }
                        </div>
                        <div>
                            <select onChange={e => handleSelector(e)} defaultValue="default">
                                <option value="default" disabled className="TemperamentsOption" >Selecciona temperamentos : </option>
                                {temperaments && temperaments.map(t=>(
                                    <option value={t} key={t} className="TemperamentsOption" >{t}</option>
                                ))}
                            </select>
                            {crear.temperaments.map(d =>
                                (<div key={d} className="divTemperaments">
                                    <p  className="selectedTemperaments">{d}</p>
                                    <button  onClick={() => handleEliminarTemperaments(d)}
                                    className="buttonclose">X</button>
                                </div>)
                            )}
                            {errors && errors.temperaments ?
                                <p>{errors.temperaments}</p> : null
                            }
                        </div>
                        <div className="ContainerButton">  
                            {/*<button type="submit" className="createButton">Crear!</button>*/}
                            <div className="div_button_Mas_errores">
                                <input className={"createButton"} type='submit' name='submit'   />
                                {errors && errors.image ?
                                    <p>Corregir imagen</p> : null
                                }{crear.temperaments.length < 2 ?
                                    <p>Agregar temperaments</p> : null
                                }{errors && errors.anios_de_vidaMin ?
                                    <p>Corregir años Min</p> : null
                                }{errors &&  errors.anios_de_vidaMax ?
                                    <p>Corregir años Max</p>: null
                                }{errors && errors.pesoMin ?
                                    <p>Corregir peso Min</p> : null
                                }{errors && errors.pesoMax ?
                                    <p>Corregir peso Max</p> : null
                                }{errors && errors.alturaMin ?
                                    <p>Corregir altura Min</p> : null
                                }{errors && errors.alturaMax ?
                                    <p>Corregir altura Max</p> : null
                                }{errors && errors.nombre ?
                                    <p>Corregir nombre </p> : null }
                                </div>  
                        </div>  
                    </form>
                </div>
            </div>
            </div>
        </div>
        
        </div>
    )
}