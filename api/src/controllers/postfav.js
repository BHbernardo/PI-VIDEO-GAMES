const { Favorite, User } = require('../db');

const postFav = async (req, res) => {
    try {
        const { id, name, platforms, image, released, rating, userid } = req.body;

        if(!id || !name || !platforms || !image || !released) {
            return res.status(401).send("Missing data");

        }
        if(!userid) {
            return res.status(400).send("Missing userid");
        }

        const newFav = await Favorite.create({  
          userid,
          id: id.toString(),
          name,
          platforms,
          image,
          released,
          rating, 
        });

    // Busca un usuario con su "id";
        const user = await User.findAll({
            where: {
                id: userid,
            }});

    // El nuevo fav lo asocia con el user encontrado;
        await newFav.addUsers(user);

    // Va a buscar todos los datos de favoritos pasados mas arriba en la base de datos y los va a guardar;     
        const favAll = await Favorite.findAll();
        return res.status(201).json(favAll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    postFav,
}

