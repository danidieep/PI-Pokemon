import React, {useState, useEffect, Fragment} from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import './PokemonCreate.css'

function validate(input){
    let errors={}
    if(!input.name){
        errors.name = 'se requiere un Nombre'
    }else if(input.img.length > 255){
        errors.img = 'Prueba con una url mas corta!'
    }else if(input.hp > 120 || input.hp < 0){
        errors.hp = 'La cantidad de vida no esta permitida elija una cantidad entre 0 y 120'
    }else if(input.attack  > 120 || input.attack < 0){
        errors.attack = 'La cantidad de ataque no esta permitida elija una cantidad entre 0 y 120'
    }else if(input.defense  > 120 || input.defense < 0){
        errors.defense = 'La cantidad de defensa no esta permitida elija una cantidad entre 0 y 120'
    }else if(input.speed  > 120 || input.speed < 0){
        errors.speed = 'La cantidad de velocidad no esta permitida elija una cantidad entre 0 y 120'
    }  else if(input.height > 2300){
        errors.height = "La altura de tu pokemon no puede superar los 2300Mts"
    }else if(input.weight > 50000){
        errors.height = "El peso de tu pokemon no debe superar los 50000 Kg"
    }else if(input.types.length > 2){
        errors.types = 'Los pokemons no pueden tener mas de 2 tipos!'
    }
    return errors
}





export default function PokemonCreate(){
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name:'', img:'', types:[], hp:'', attack:'', defense:'', speed:"", height:'', weight:''
    })

    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        setInput ({
           ...input,
           types: [...input.types, e.target.value]
       })}

    //    console.log(errors)

    function handleSubmit(e){
        e.preventDefault()
        setErrors(validate(input))
        if(errors.name || errors.img || errors.hp || errors.weight || errors.height || errors.attack || errors.defense || errors.types) {
          alert('Error: Todavia tienes algunos valores invalidos')
          e.preventDefault()
          setErrors('')
        }else if(!input.name || !input.hp || !input.attack || !input.weight || !input.height ){
            alert('Error: Faltan algunos campos obligatorios')
            e.preventDefault()
            setErrors('')
        }else if(!input.types.length){
        alert('Error: Tu pokemon tiene que tener tipo')
        e.preventDefault()
        setErrors('')
        }
        else{
            dispatch(postPokemon(input))
        alert('Pokemon creado!!')
        setInput({
            name:'', img:'', types:[], hp:'', attack:'', defense:'', speed:"", height:'', weight:''
        })
        history.push('/home')
        }
        
    }

    function handleDelete(e){
        setInput({
            ...input,
            types: input.types.filter(t => t !== e)
        })
    }

    useEffect(() =>{
        dispatch(getTypes())
    }, [dispatch])

    return (
        <Fragment >
             <div className="head">
                <Link to='/home'><button>Volver</button></Link>
                <h1>Crear pokemon</h1>
            </div>
            <div className='container'>
           
            
            <div className="form">
                <form onSubmit={(e) =>handleSubmit(e)}>
                    <div className="labels">
                        <label htmlFor="">Nombre</label>
                        <input type="text" value={input.name} name='name' onChange={(e) =>handleInputChange(e)}/>
                        {
                  errors.name? (<p className='error'>{errors.name }</p>) : (false)
                }
                    </div>
                    <div className="labels">
                        <label htmlFor="">Imagen</label>
                        <input type="text" value={input.img} name='img' onChange={(e) =>handleInputChange(e)}/>
                        {
                  errors.img? (<p className='error'>{errors?.img }</p>) : false
                }
                    </div>
                    <div className="labels">
                        <label htmlFor="">Vida</label>
                        <input type="text" value={input.hp} name='hp' onChange={(e) =>handleInputChange(e)}/>
                        {
                  errors.hp?  (<p className='error'>{errors?.hp || ""}</p>) : false
                }
                    </div>
                    <div className="labels">
                        <label htmlFor="">Ataque</label>
                        <input type="text" value={input.attack} name='attack' onChange={(e) =>handleInputChange(e)}/>
                        {
                  errors.attack? (<p className='error'>{errors?.attack }</p>) : false
                }
                    </div>
                    <div className="labels">
                        <label htmlFor="">Defensa</label>
                        <input type="text" value={input.defense} name='defense' onChange={(e) =>handleInputChange(e)}/>
                        {
                  errors.defense? (<p className='error'>{errors?.defense}</p>) : false
                }
                    </div>
                    <div className="labels">
                        <label htmlFor="">Velocidad</label>
                        <input type="text" value={input.speed} name='speed' onChange={(e) =>handleInputChange(e)}/>
                        {
                  errors.speed? (<p className='error'>{errors?.speed}</p>) : false
                }
                    </div>
                    <div className="labels">
                        <label>Peso en gramos</label>
                        <input type="text" value={input.weight} name='weight' onChange={(e) =>handleInputChange(e)}/>
                        {
                  errors.weight? (<p className='error'>{errors?.weight}</p>) : false
                }
                    </div>
                    <div className="labels">
                        <label htmlFor="">Altura</label>
                        <input type="text" value={input.height} name='height' onChange={(e) =>handleInputChange(e)}/>
                        {
                  errors.height? (<p className='error'>{errors?.height}</p>) : false
                }
                    </div>
                    
                    <div className="tipos">
                    <label>Tipos</label>
                    <select onChange={(e) =>handleSelect(e)}>
                        {types.map((t) => (
                            <option value={t.name}>{t.name}</option>
                        ))}
                    </select>
                    </div>
                    <div className="listaTipos">
                    <ul><li>{
                    input.types.map(e=>
                        <div className="botonD">
                            <p>{e}</p>
                            <button onClick={()=> handleDelete(e)}>X</button>
                        </div>
                        )
                }</li></ul>
                
                    </div>
                    <button className="botonS" type="submit">Crear pokemon</button>
                </form>
                
            </div>
            </div>
        </Fragment>
    )
}