const axios = require('axios')
const e = require('express')
const { Pokemon, Type  } = require('../db.js')

// traigo los datos de la api 
const getPokemon = async() =>{ 
    const api = await axios
    .get('https://pokeapi.co/api/v2/pokemon?limit=40')  //traigo los pokemons
    .then((pokes)=>{
        return pokes.data.results
    })
    .then((pokes) =>{
        return Promise.all
        (pokes.map((res)=> axios(res.url)))   //Mapear todos los elementos y hacer un get en cada url
    })
    .then((pokes) =>{
        return pokes.map((res) => res.data)  // guardo el resultado de cada pokemon en api
    })
    let arrPokes = api.map((r) =>{  // en un array guardo los datos que quiero de cada pokemon
        return {
            id: r.id,
            name: r.name,
            types: r.types.map((t) => t.type.name),
            img: r.sprites.front_default,
            hp: r.stats[0].base_stat,
            attack:r.stats[1].base_stat,
            defense: r.stats[2].base_stat,
            speed: r.stats[3].base_stat,
            height: r.height,
            weight: r.weight
        }
    })
    return arrPokes
}


const getTypes = async() =>{
    const apiTypes = await axios('https://pokeapi.co/api/v2/type') // traigo los tipos
    const dbTypes = await apiTypes.data.results.map(c => {
        return{
            name: c.name
        }
    })
    if(dbTypes.length){
        Type.bulkCreate(dbTypes)
    }  
}
// getTypes()

//traigo los datos de la db

const getDbInfo = async () =>{
    try {
        const pokesDB = await Pokemon.findAll({
            include:{
                model:Type,
                attributes:['name'],
                through:{
                    attributes:[]
                }
            }
        })
        const dbPokes = pokesDB?.map((p) =>{
        return {
            id: p.id,
            name: p.name,
            types: p.types.map((t) => t.name),
            img: p.img,
            hp: p.hp,
            attack:p.attack,
            defense: p.defense,
            speed: p.speed,
            height: p.height,
            weight: p.weight,
            createdInDb: p.createdInDb
        }
        })
        return dbPokes
    } catch (error) {
        console.log(error)
    }
}

// junto los pokemons de la api y los pokemons creados

const getAll = async () =>{
    const apiInfo = await getPokemon()
    const dbInfo = await getDbInfo()
    const all = apiInfo.concat(dbInfo)
    // console.log(all)
    return all
}




module.exports ={
    getAll,
    getTypes
}