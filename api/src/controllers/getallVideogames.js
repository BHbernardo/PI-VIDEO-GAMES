const axios = require("axios");
const URL = "https://api.rawg.io/api/games";
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db");

const getallVideogames = async (req, res) => {
    try {
       let videogames = [];
       const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // paginado;

    //Traemos los primeros 200 de la api;
    await Promise.all(pages.map(async (page) => {
          const games = await axios.get(`${URL}?key=${API_KEY}&page=${page}`);
  
          videogames.push(
            ...games.data.results.map((data) => {
              return {
                id: data.id,
                name: data.name,
                releaseDate: data.released,
                rating: data.rating,
                description: data.description,
                platforms: data.platforms.map((plat) => plat.platform.name),
                image: data.background_image,
                genres: data.genres.map((gen) => gen.name),
              };
            })
          );
        })
      );
    //Traemos los juegos de la base de datos;
    const videogamesdb = await Videogame.findAll({
        include: [Genres],
      });
  
    //Los juntamos y los muestro;
      videogames = [...videogamesdb, ...videogames];
      res.status(200).json(videogames);
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
}

module.exports = {
    getallVideogames,
}