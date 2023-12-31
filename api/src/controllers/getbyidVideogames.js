const axios = require("axios");
const URL = "https://api.rawg.io/api/games";
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

const getbyidVideogames = async (req, res) => {

  try {
    const { id } = req.params;
    console.log("que muestra esto", typeof id)

        // Verificamos si el id es un UUID, una vez que lo verifica lo busca;
            
            const isUUID =
              /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
                id
              );

// Guardamos el juego en una variable para la busqueda en la base de datos;        
        let videogameDb; 

// Si el id es UUID, búsqueda del juego en la base de datos local
    
    if (isUUID) {
      videogameDb = await Videogame.findOne({
        where: { id },
        include: { model: Genre, attributes: ["name"] },
      });

      const genres = videogameDb.genres.map((genre) => genre.name);

      // Actualiza videogame con los nombres de los géneros
      videogameDb = {
        ...videogameDb.toJSON(),
        genres,
      };
    }  


// Si no se encuentra en la base de datos, hacer una solicitud a la "API";
        if (!videogameDb) {

// Solicitud a la "API";
         const { data } = await axios(`${URL}/${id}?key=${API_KEY}`);
      
// Si no se encuentra el juego en la "API", tira un error;
        if (!data) {
            return res.status(404).json("The ID does not exist");
        }

// Mapear los datos de la "API" para crear un objeto con la información del juego;
        videogameDb = {
            id: data.id,
            name: data.name,
            releaseDate: data.released,
            rating: data.rating,
            description: data.description,
            platforms: data.platforms.map((plat) => plat.platform.name), // se nesecita mapear el nombre de la plataforma para traerlo;
            image: data.background_image,
            genres: data.genres.map((gen) => gen.name), // se nesecita mapear el nombre del genero para traerlo;
            };
          }
          return res.status(200).json(videogameDb);
 } catch (error) {
    res.status(500).send({ error: error.message });
 }
}

module.exports = {
    getbyidVideogames,
}