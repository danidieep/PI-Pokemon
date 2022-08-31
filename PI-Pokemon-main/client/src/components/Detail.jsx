import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getPokemonByID, resetDetail } from "../actions";
import './Detail.css'

export default function Detail(props){
    //  let type = types.join(', ')
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch ( getPokemonByID(props.match.params.id))
    }, [dispatch])

    let details = useSelector((state) =>state.detail)
    let loader = useSelector((state) => state.loading)
    console.log(details)

    function handleReset(e){
        e.preventDefault()
        dispatch(resetDetail())
        history.push('/home')
    }

    return (
        <Fragment>
            <div className="headD">
            <button onClick={handleReset} >Volver</button>
                <h1>Pokedex</h1>
            </div>


               { 
                loader  ? 
                 <img
                src={"https://static.wixstatic.com/media/20abc5_e58061f333744c2899c375ec7f024eb3~mv2.gif"}
                width="250px" height="300px"
                alt="Not found"
              /> :
                <div className="container">
               <div className="card">
                <img src={details.img} alt='img' width='200px' height='200px' />
                    <h2>Nombre: {details.name}</h2>
                  <div className="tipardos"><h2>Tipos: </h2>
                  <h2>{typeof details.types[0] === 'string' ? details.types[0] : details.types[0]?.name + ' - '}
                  {typeof details.types[1] === 'string' ? " - " + details.types[1]   :  details.types[1]?.name}
              </h2>
                  </div>
                 <h2>ID: #{details.id}</h2>
                  <div className="infoD">
                      <h2>Estadisticas</h2>
                      <h3>VIDA: {details.hp}</h3>
                      <h3>ATAQUE: {details.attack}</h3>
                      <h3>DEFENSA: {details.defense}</h3>
                      <h3>VELOCIDAD: {details.speed}</h3>
                  </div>
                  <div className="infoD">
                  <h2> Caracteristicas del pokemon</h2>
                  <h3>Altura: {details.height / 10} Mts</h3>
                  <h3>Peso: {details.weight / 10} Kgs</h3>
                  </div> 
                </div> 
                </div> 
            } 

        </Fragment>
   
    )
}