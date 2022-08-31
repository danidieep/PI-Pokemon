const initialState ={
    pokemons : [],
    allPokemons:[],
    types: [],
    allTypes:[],
    detail:[],
    filtered:[],
    loading: true
}


function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload, // en mi estado de pokemons mando todo lo que llegue con la accion get pokemons
                allPokemons: action.payload
            }
        case 'GET_TYPES':
            const type = action.payload
            type.unshift({name: 'Todos'})
            return {
                ...state,
                types: type,
                allTypes:type
            }
            
        case 'GET_NAME_POKEMONS':
            return{
                ...state,
                allPokemons:action.payload
            }
        case 'GET_ID_POKEMON':
                console.log(state.allPokemons)
                console.log(state.detail)
                return{
                    ...state,
                    detail: action.payload,
                    loading: false
                } 
        
        case 'RESET_DETAIL':
        //     // console.log(state.pokemons)
        //     // console.log(state.allPokemons)
        //     // console.log(state.detail)
            return{
                ...state,
                detail:[],
                loading: true
            }
        case 'FILTER_BY_TYPE':
            const pokes = state.pokemons
            const typeFilter = action.payload === 'Todos' ? pokes : pokes.filter((j) => j.types.includes(action.payload))
            if(!typeFilter.length){
                alert (`no se encontraron pokemons con el tipo ${action.payload}`)
            }
            return{
                ...state,
                allPokemons: typeFilter.length ?  typeFilter : pokes
            }
        case 'FILTER_BY_CREATED':
                const todos = state.pokemons
                const filterCreated = action.payload === 'creados' ? todos.filter(e=> e.createdInDb) : todos.filter(e=> !e.createdInDb)
                return{
                    ...state,
                    allPokemons: action.payload === 'All' ? state.pokemons : filterCreated
                }
        
        case 'ORDER_BY_NAME' :
                const orderPokemons = action.payload === 'asc' ?
                    state.allPokemons.sort(function(a,b) {
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1
                            }
                            return 0
                        }) :
                    state.allPokemons.sort(function(a,b){
                        if(a.name > b.name){
                            return -1
                            }
                        if(b.name > a.name){
                            return 1
                            }
                            return 0
                            })
                    return{
                        ...state,
                        pokemons: orderPokemons
                        }
            case 'ORDER_BY_ATTACK' :
                const orderByAttack = action.payload === 'ascA' ?
                    state.allPokemons.sort(function(a,b) {
                        if(a.attack > b.attack){
                             return 1;
                            }
                        if(b.attack > a.attack){
                            return -1
                            }
                            return 0
                        }) :
                    state.allPokemons.sort(function(a,b){
                        if(a.attack > b.attack){
                           return -1
                            }
                        if(b.attack > a.attack){
                            return 1
                            }
                            return 0
                        })
                    return{
                    ...state,
                    pokemons: orderByAttack
                    }
            case 'LOADING_TRUE':
                 return {
                     ...state,
                     loading:true
                 }
                 case 'LOADING_FALSE':
                    return {
                        ...state,
                        loading:false
                    }      
        
        default:
            return state
    }
}

export default rootReducer;