import axios from 'axios'

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get('/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload:json.data
        })
    }
}

export function getPokemonByName(name){
    return async function(dispatch){
        try {
            var response = await axios.get('/pokemons?name=' + name)
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: response.data
            })
        } catch {
            return alert ('no se encontro el pokemon con ese nombre')
        } 
    }
}

export function getTypes(){
    return async function(dispatch){
        var result = await axios.get('/types')
        return dispatch({
            type: 'GET_TYPES',
            payload: result.data
        })
    }
}

export function getPokemonByID(id){
    return async function(dispatch){
        try {
            var respuesta = await axios.get('/pokemons/' + id)
            // console.log(respuesta)
            return dispatch({
                type: 'GET_ID_POKEMON',
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function resetDetail(){
    return{
        type : 'RESET_DETAIL'
    }
}


export function postPokemon(payload){
    return async function (dispatch){
        var post = await axios.post('http://localhost:3001/pokemons', payload)
        return post
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload

    }
}

export function orderByAttack(payload){
    return {
        type:'ORDER_BY_ATTACK',
        payload
    }
}

export function filterByType(payload){
    return {
        type: 'FILTER_BY_TYPE',
        payload 
    }
}



export function filterByCreated(payload){
    return {
        type: 'FILTER_BY_CREATED',
        payload
    }
}


export function setLoadingTrue(){
    return {
        type: 'LOADING_TRUE'
    }
}

export function setLoadingFalse(){
    return {
        type: 'LOADING_FALSE'
    }
}