const axios = require("axios");
const URL = "https://api.rawg.io/api/games";
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

// Variable para almacenar los juegos una vez obtenidos
let cachedGames = null;

// Función para obtener los juegos
const getGames = async () => {
  if (cachedGames === null) {
    // Si no se han obtenido los juegos previamente, realiza la solicitud a la API
    
    try {
      let videogames = [];
      const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

      // traemos los primeros 200 juegos de la api
      await Promise.all(
        pages.map(async (page) => {
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

      // Combinar los juegos obtenidos con los juegos de la base de datos
      const videogamesdb = await Videogame.findAll({
        include: [Genre],
      });

      videogames = [...videogamesdb, ...videogames];
      
      
      // Almacenar los juegos en la variable cachedGames para futuras solicitudes
      cachedGames = videogames;
    } catch (error) {
      console.error("Error fetching games:", error.message);
      throw error;
    }
  }

  return cachedGames;
};

const getallVideogames = async (req, res) => {
  try {
    const videogames = await getGames();

    res.status(200).json(videogames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getallVideogames,
};