import axios from "axios";
export const GET_DOGS="GET_DOGS"
export const GET_TEMPERAMENTS="GET_TEMPERAMENTS"
export const FILTRADO_POR_TEMPERAMENTS="FILTRADO_POR_TEMPERAMENTS"
export const FILTRADO_POR_BD="FILTRADO_POR_BD"
export const ORDEN_POR_PESO="ORDEN_POR_PESO"
export const ORDEN_POR_NOMBRE="ORDEN_POR_NOMBRE"
export const BUSCAR_POR_NOMBRE="BUSCAR_POR_NOMBRE"
export const GET_DETALLE="GET_DETALLE"
export const POST_DOGS = 'POST_DOGS'
export const BORRARD = 'BORRARD'


export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
        type:GET_DOGS,
        payload: json.data
        })
    }
}
export function postDogs(payload){
    return async function (){
        try {
            let json = await axios.post('http://localhost:3001/dogs',payload)
            console.log(json)
            return json;
        } catch (error) {
            console.log(error.message)
        } 
    }
}
export function getTemperaments() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/temperaments');
        return dispatch({ type: GET_TEMPERAMENTS, payload: json.data })
    }
};
export function FiltradoPorTemperaments(payload){
    return{
        type: FILTRADO_POR_TEMPERAMENTS,
        payload
    }
}
export function FiltradoPorBD(payload){
    return{
        type: FILTRADO_POR_BD,
        payload
    }
}

export function OrdenPorPeso(payload){
    return{
        type: ORDEN_POR_PESO,
        payload
    }
}
export function OrdenPorNombre(payload){
    return{
        type: ORDEN_POR_NOMBRE,
        payload
    }
}
export function BorrarD(){
    return{
        type: BORRARD,
    }
}
export function buscarpornombre(name) {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/dogs?name=' + name);
        return dispatch({ type: BUSCAR_POR_NOMBRE, payload: json.data })
    }
};
export function getDetalle(id){
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/dogs/' + id);
        return dispatch({ type: GET_DETALLE, payload: json.data })
    }
}