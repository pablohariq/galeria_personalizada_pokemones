import axios from 'axios'
import http from 'http' //usamos import para type: module

//obtener data de 151 pokemon (para qué vamos a dejar a Mew fuera)
//funcion asincrona que obtiene los datos

const obtenerPokedata = async () => {
    const {data: responseData} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
    const pokeData = responseData.results
    return pokeData //type: promise
}

const obtenerDatosPokemonIndividual = async (pokeData) => {
    const promesasDatosPokemonIndividuales = pokeData.map(async ({url}) => {
        const {data: datosPokemonIndividual} = await axios.get(url)
        return datosPokemonIndividual
    })
    // console.log(promesasDatosPokemonIndividuales)
    return promesasDatosPokemonIndividuales //array de promesas
}

// (async () => {
// const pokeData = await obtenerPokedata()
// const promesas = obtenerDatosPokemonIndividual(pokeData)
// const datosPokemonIndividual = await obtenerDatosPokemonIndividual(pokeData)
// const datosIndividual = await Promise.all(datosPokemonIndividual)
// const jsonRespuesta = datosIndividual.map(p => {
//     const objRespuesta = {
//         nombre: p.name,
//         img: p.sprites.front_default
//     }
//     return objRespuesta
// })
// console.log(jsonRespuesta)
// })(); 

const crearObjetoConImagenYNombre = async () => { //esta funcion la exportaremos para usarla en el servidor
    const pokeData = await obtenerPokedata()
    const datosPokemonIndividual = await obtenerDatosPokemonIndividual(pokeData)
    const datosIndividual = await Promise.all(datosPokemonIndividual)
    const jsonRespuesta = datosIndividual.map(p => {
        const objRespuesta = {
            nombre: p.name,
            img: p.sprites.front_default
        }
        return objRespuesta
    }); 
    return jsonRespuesta
}

export {crearObjetoConImagenYNombre}