const axios = require("axios");
const URL = " https://api.rawg.io/api/games";
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame } = require("../db");
const { Op } = require("sequelize");

const getbynameVg = async(req, res) => {
  try {
    const { name } = req.query;
    if(!name) {
        throw new Error ('Indique el parametro "name" en su consulta');
    }
   //Buscar el nombre en la "Base de datos";
   const videogame = await Videogame.findOne({ 
    where: { 
    id,
    name: { 
      [Op.iLike]: `%${name}%` 
    } 
  }, 
  limit: 15,
});
   
   // Realizar una solicitud a la API;
   const response = await axios.get(`${URL}?key=${API_KEY}&search=${name}`);
   
   // Filtramos los videojuegos encontrados que coinciden SOLO 15 con el nombre proporcionado;
   const filtrados = response.data.results
      .filter((game) => game.name.toLowerCase().includes(name.toLowerCase()))
      .slice(0, 15);

   // Mapear los datos de los videojuegos filtrados para obtener una lista;
    const videoGames = filtrados.map((data) => ({
        id: data.id,
        name: data.name,
        releaseDate: data.released,
        rating: data.rating,
        description: data.description,
        platforms: data.platforms.map((plat) => plat.platform.name),
        image: data.background_image,
      }));

   // Agregar el videogame a videoGames solo si se encontró un juego con el nombre indicado;
   if (videogame) {
    videoGames.push({
      id: videogame.id,
      name: videogame.name,
      releaseDate: videogame.releaseDate,
      rating: videogame.rating,
      description: videogame.description,
      platforms: videogame.platforms,
      image: videogame.image,
    });
  }

   // Si no se encuentra ningun juego que coincida con el nombre, devuelve un mensaje de error 404;
    if (videoGames.length === 0) {
        return res.status(404).json({
          message: `No video games found with the name ${name}`,
        });
      }
      res.status(200).json(videoGames);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = {
    getbynameVg,
}