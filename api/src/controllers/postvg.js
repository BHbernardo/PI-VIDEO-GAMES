const { Videogame, Genre } = require("../db");

const postvg = async (req, res) => {
  try {

// Corroborar que todas las propiedades existan;    
    const { name, description, platforms, image, releaseDate, rating, genres } = req.body;

// Si alguna de las propiedades no existe, lanza un mensaje de error;
    if(!name || !description || !platforms || !image || !releaseDate || !rating || !genres){
        return res.status(400).send("Hacen falta datos");
    }

// Si no existe un genero, lanzar otro mensaje de error;
    if(!genres.length) return res.status(400).send("Debe agregar un genero");
    
// Hay que obtener un registro existente que tenga el mismo "NAME" y "DESCRIPTION" en la base de datos;
    const videoGameOk = await Videogame.findOne({ 
        where: { 
            name, 
            description,
        },
    });

// Si ya existen los mismos datos "name" y descripcion" devolver un mensaje de error;
    if(videoGameOk) return res.status(400).json({ message: "El objeto ya existe" });

// Buscar los géneros seleccionados por ID, que incluya al menos UNO;
    const Genresselec = await Genre.findAll({ 
        where: { 
            name: genres, 
        },
    });

// Creamos un nuevo juego;
    const vg = await Videogame.create({
        name,
        description,
        platforms,
        image,
        releaseDate,
        rating,
        genres
      });

// Asociar los géneros encontrados al nuevo juego;
    await vg.addGenres(Genresselec);

    return res.status(201).json(vg);
    
}   catch (error) {
    return res.status(500).json({ error: error.message });
   }
}

module.exports = {
    postvg,
}