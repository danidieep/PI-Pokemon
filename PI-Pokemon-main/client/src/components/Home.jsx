import React, { Fragment } from 'react'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  { getPokemons, getTypes, getPokemonByName, orderByName, orderByAttack, filterByCreated, filterByType} from '../actions'
import {Link} from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from './SearchBar'
import './Home.css'

export default function Home(){

    const allPokemons = useSelector((state) => state.allPokemons)
    const allTypes = useSelector((state) => state.types)
    console.log(allPokemons)  
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] =useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    
    const paginado =(pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    const dispatch = useDispatch()


    useEffect(() =>{
        dispatch(getPokemons())
        dispatch(getTypes())   
        
    }, [dispatch])



    function handleOrdenByName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleOrderByAttack(e){
        e.preventDefault()
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterByCreated(e){
        e.preventDefault()
        dispatch(filterByCreated(e.target.value))
    }

    function handleFilterByType(e){
        e.preventDefault()
        dispatch(filterByType(e.target.value))
    }


    return (
        
        <Fragment>
            {
            allPokemons.length>0 ?
            <div>
                <div className='header'>
                 <div className='titulo'>
                <h2>Henry PI</h2>
                <h1>Pokemon</h1>
                </div>
                <div className='botonCreate'>
                    <Link to= '/pokemons'><button>Crear pokemon</button></Link>
                </div>
            </div>
            
            <div className='headsortfilter'>
                <div className='orden'>
            <select onChange={e => handleOrdenByName(e)}>
                <option value="normal">Ordenar alfabeticamente</option>
                <option value="asc">Orden de A-Z</option>
                <option value="desc">Orden de Z-A</option>
            </select>
            <select onChange={e => handleOrderByAttack(e)}> 
                <option value="normal">Ordenar por ataque</option>
                <option value="ascA">Menos ataque</option>
                <option value="descA">Mas ataque</option>
            </select>
            </div>
            <div className='orden'>
            <select onChange={e => handleFilterByCreated(e)}>
                <option value="All">Filtrado por api/db</option>
                <option value="api">Pokemons de api</option>
                <option value="creados">Pokemons creados</option>
            </select>
            <select onChange={e => handleFilterByType(e)} >
                <option  value='Todos' >Filtrado por tipo</option>
                    {allTypes && allTypes.map((g) =><option value={g.name}>{g.name}</option>)}      
                  </select>
            </div>

            <div className='searchBar'>
                <h2>Buscar pokemons por nombre</h2> 
                <SearchBar/>
            </div>
            </div>
           
            

            
            <div className='pokesContainer'>
                {
                    currentPokemons && currentPokemons?.map((e) =>{
                        return(
                            <div>
                                <Link to={'/home/' + e.id}>
                                    <div className='cards'>
                                        <Card name={e.name} img={e.img} types={e.types}/>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
               
            </div> 
            <div className='paginado'>
            <Paginado
                 pokemonsPerPage={pokemonsPerPage}
                 allPokemons={allPokemons.length}
                 paginado={paginado}
                 />
            </div>
            </div> : <img
                src={"https://static.wixstatic.com/media/20abc5_e58061f333744c2899c375ec7f024eb3~mv2.gif"}
                width="250px" height="300px"
                alt="Not found"/>
        } 
        </Fragment>
    )
}