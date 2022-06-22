import {
    GET_DOGS,GET_TEMPERAMENTS,ORDEN_POR_NOMBRE,
    FILTRADO_POR_TEMPERAMENTS,FILTRADO_POR_BD,ORDEN_POR_PESO,
    BUSCAR_POR_NOMBRE,GET_DETALLE,POST_DOGS,BORRARD
} from "../actions/index.js"
const initialState = {
    Dogs : [],
    AllDogs:[],
    Temperaments:[],
    Detalle:{} 
}

function rootReducer (state = initialState , action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                Dogs: action.payload,
                AllDogs: action.payload
            }
        case GET_TEMPERAMENTS:
            return{
                ...state,
                Temperaments: action.payload,
            }
        case FILTRADO_POR_TEMPERAMENTS:
            const All_Dogs = [...state.AllDogs];
            const Temperaments_Filtered=action.payload==="default"
            ?All_Dogs
            :All_Dogs.filter(el=>{
                let names = el.createdInDb
                ? el.temperaments ? el.temperaments.map(d => d.name) : "nada"
                : el.temperaments ? el.temperaments.toString().replace(/\s+/g, '').split(",").sort() : "nada"
                if (names.includes(action.payload)) return el
            })
            return{
                ...state,
                Dogs: Temperaments_Filtered,
            }
        case FILTRADO_POR_BD:
            const All_Dogs_ = state.AllDogs
            const Temperaments_Filtered_=action.payload==="si"?
            All_Dogs_.filter(el=>{
                let names = el.createdInDb
                if (names) return el
            }):
            All_Dogs_.filter(el=>{
                let names = el.createdInDb
                if (!names) return el
            })
            return{
                ...state,
                Dogs: Temperaments_Filtered_,
            }
        case ORDEN_POR_PESO:
            const perros = state.Dogs;
            const arreglo1 = action.payload === "Ascendente"
            ? perros.sort((a,b) => {
                const pesoA = Number(a.peso.split(" - ")[0])
                const pesoB = Number(b.peso.split(" - ")[0])
                if(pesoA < pesoB) return -1
                if(pesoA > pesoB) return 1
                if(!pesoA) return -1
                if(!pesoB) return -1
                return 0
            })
            : perros.sort((a,b) => {
                const pesoA = Number(a.peso.split(" - ")[0])
                const pesoB = Number(b.peso.split(" - ")[0])
                if(Number(pesoB) < Number(pesoA)) return -1
                if(Number(pesoB) > Number(pesoA)) return 1
                if(!pesoA) return -1
                if(!pesoB) return -1
                return 0
            })
        return{
            ...state,
            Dogs: arreglo1 
        }
        case ORDEN_POR_NOMBRE:
            let arreglo = action.payload === "A-Z" ?
            state.Dogs.sort(function(a,b){
                if(a.nombre > b.nombre){
                    return 1;
                }
                if(a.nombre < b.nombre){
                    return -1;
                }
                return 0;
            }): 
            state.Dogs.sort(function(a,b){
                if(a.nombre > b.nombre){
                    return -1;
                }
                if(a.nombre < b.nombre){
                    return 1;
                }
                return 0;
            })
        return{
            ...state,
            Dogs: arreglo 
        }
        case BUSCAR_POR_NOMBRE:           
            return {
                ...state,
                Dogs: action.payload
            }
        case GET_DETALLE:
            return {
                ...state,
                Detalle: action.payload
            }
            
        case POST_DOGS:
            return {
                ...state
            }
        case BORRARD:
        return {
            ...state,
            Detalle:{}
        }
        default:
            return state
    }

}
export default rootReducer;