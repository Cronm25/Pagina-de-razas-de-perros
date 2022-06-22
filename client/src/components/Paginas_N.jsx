import React from "react"
import "./Paginas_N_.css"
export default function Paginado({DogsPorPagina,cantidad,paginado,currentPage}){
    const pageNumber=[]
    for (let i = 1; i <= Math.ceil(cantidad/DogsPorPagina); i++) {
        pageNumber.push(i)
    }
    return(
        <nav className="center">
            <ul className="pagination">
                {currentPage!==1?
                <button onClick={()=>paginado(currentPage-1)}  >Anterior</button>:
                <button>Anterior</button>
                }
                {
                    pageNumber && pageNumber.map(number=>(
                        <li key={number}>
                            <button key={number} onClick={()=>paginado(number)}>{number}</button>
                           
                        </li> 
                    ))
                }
                {currentPage!==pageNumber.length?
                <button onClick={()=>paginado(currentPage+1)}  >Siguiente</button>:
                <button>Siguiente</button>
                }
            </ul>
        </nav>
    )
}