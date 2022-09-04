const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Type } = require('../db');
const { getAll, getTypes } = require('./getData')
const { Op } = require("sequelize");
const axios  = require('axios');
// const {  } = require('../app');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//rutas de get pokemons

router.get('/pokemons', async(req, res) =>{
    let {name} = req.query
    if(name){
        try {
        const pokemons = await getAll()
        const pokemon = pokemons.filter((p) => p.name.toUpperCase() === name.toUpperCase())
        if(pokemon.length){
            res.status(200).json(pokemon)
        }else{
            res.status(404).send('no se ha encontrado un pokemon con ese nombre')
        }
        } catch (error) {
            console.log(error)
        }
    }
    try {
        const allPokemons = await getAll()
        res.status(200).json(allPokemons)
    } catch (error) {
        console.log(error)
    }
})



//ruta de get Types

router.get('/types', async (req, res) =>{
    try {
        const hayTypes = await Type.findAll()
         if(hayTypes.length) return res.status(200).json(hayTypes)
         const allTypes = await getTypes()
         res.status(200).json(allTypes)
    } catch (error) {
        console.log(error)
    }
})

// ruta por id

router.get('/pokemons/:id', async(req, res) =>{
    let {id} = req.params
    if(id.includes('-')){
        let pokeDb = await Pokemon.findOne({
            where:{
                id: id,
            },
            include: Type
        })
        console.log(pokeDb)
        res.json(pokeDb)
    }else{
        try { 
            if(id){
                const pokemonid = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                console.log(pokemonid)
               
                    var filter = {
                        name: pokemonid.data.name,
                        id: pokemonid.data.id,
                        types: pokemonid.data.types.map((t) => t.type.name), 
                        img: pokemonid.data.sprites.front_default,
                        hp: pokemonid.data.stats[0].base_stat,
                        attack:pokemonid.data.stats[1].base_stat,
                        defense: pokemonid.data.stats[2].base_stat,
                        speed: pokemonid.data.stats[3].base_stat,
                        height: pokemonid.data.height,
                        weight: pokemonid.data.weight
                    } 
                    res.status(200).json(filter)
                
            }
        }
     catch (error) {
            console.log(error)
            res.status(404).send('este id no pertenece a un pokemon')
        }
    }
        
    })


    // ruta post

router.post('/pokemons' , async(req, res) =>{
    let {name, img, types, hp, attack, defense, speed, height, weight, createdInDb} = req.body
    try {
        let createPokemon = await Pokemon.create({
            name, img, hp, attack, defense, speed, height, weight, createdInDb
        })
        if(Array.isArray(types) && types.length){
            var typesDb = await Type.findAll({
                where:{name: types}
            })
        }
      
        createPokemon.setTypes(typesDb)
        res.send('creado con exito')
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;
