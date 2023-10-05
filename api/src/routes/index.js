const { Router } = require('express');

// Importar todos los routers;
const {getallGenre} = require('../controllers/getallGenre');
const {getbynameVg} = require('../controllers/getbynameVg');
const {getallVideogames} = require('../controllers/getallVideogames');
const {getbyidVideogames} = require('../controllers/getbyidVideogames');
const {postvg} = require('../controllers/postvg');
const {login} = require('../controllers/login');
const {postUser} = require('../controllers/postuser');
const {postFav} = require('../controllers/postfav')

const router = Router();

// Configurar los routers:

// Ruta para obtener todos los géneros de la API;
router.get("/genres", getallGenre);
// Ruta para obtener los primeros 15 juegos que contienen un nombre especificado;
router.get("/name", getbynameVg);
// Ruta para obtener todos los juegos de la API;
router.get("/", getallVideogames);
// Ruta para obtener el detalle de un juego específico por su ID;
router.get("/:id", getbyidVideogames);
// Ruta para manejar el inicio de sesión de usuario;
router.get("/login", login);
// Ruta para crear un nuevo juego y relacionarlo con sus géneros;
router.post("/", postvg);
// Ruta para crear un nuevo usuario;
router.post("/login", postUser);
// Ruta para agregar un juego a favs;
router.post("/fav", postFav);



module.exports = router;
