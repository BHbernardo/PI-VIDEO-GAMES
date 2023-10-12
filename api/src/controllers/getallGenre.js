const axios = require('axios');
const URL = "https://api.rawg.io/api/genres";
require("dotenv").config();
const { API_KEY } = process.env;
const { Genre } = require("../db");

const getallGenre = async (req, res) => {
  try {

    // Hacemos la solicitud a la "API" para obtener los géneros;
    const response = await axios(`${URL}?key=${API_KEY}`);

    // Hacemos un "MAP" a la respuesta de la "API" de los objetos de género;
    const Generos = response.data.results.map((data) => ({
        id: data.id,
        name: data.name,
        games_count: data.games_count,
      }));

      const Genr = await Promise.all( // devuelve una promesa que termina correctamente cuando todas las promesas en el argumento
        Generos.map(async (gen) => {
          const { id, name } = gen;
          const [genre] = await Genre.findOrCreate({ where: { id, name },
          });
          return genre;  
        })
      );
      res.status(200).json(Genr);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

module.exports = {
    getallGenre,
}