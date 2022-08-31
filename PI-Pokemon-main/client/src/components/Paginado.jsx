import React from "react";
import './Paginado.css'

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumber = []

    for(let i=0; i< Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumber.push(i + 1)
    }

    return(
        <div className="pagination">
        <nav>
            <ul>
                    { pageNumber &&
                            pageNumber.map(number =>(
                        <li key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))}
                </ul>
        </nav>
        </div>
        
    )
}