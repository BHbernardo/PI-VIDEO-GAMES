import axios from "axios";
import { 
    ADD_FAV, 
    DELETE_FAV, 
    GENRES_VIDEOGAMES, 
    GET_VIDEOGAMES, 
    VIDEOGAMES_DETAIL,
    VIDEOGAMES_NAME, 
    DETAIL_CLEAN,
    // CREATE_GAME
} from "./actions.types";

// variable de entorno para almacenar información de configuración;
// const API_URL = process.env.REACT_APP_URL;

// Traemos todos los juegos con esta ACCION;
export const getVideoGames = () => {
    const endpoint = 'http://localhost:3001/videogames/';
    return async (dispatch) => {
        try {
           const { data } = await axios.get(endpoint);
           
           return dispatch({
            type: GET_VIDEOGAMES,
            payload: data,
           });

        } catch (error) {
            console.log(error.message);
        };
    };
};

// Accion para obtener los primeros 15 juegos filtrados por nombre;
export const nameVg = (name) => {
    const endpoint = 'http://localhost:3001/videogames/name?name=' + name;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            return dispatch({
                type: VIDEOGAMES_NAME,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        };
    };
};

// Obtiene todos los generos de los juegos;
export const genresVg = () => {
    const endpoint = 'http://localhost:3001/videogames/genres';
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            return dispatch({
                type: GENRES_VIDEOGAMES,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        };
    };
};

// Agrega un juego a favoritos;
export const addFav = (videogame) => {
    const endpoint = 'http://localhost:3001/videogames/fav';
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, videogame);

            if(!data.length) throw Error('No hay favoritos')

            return dispatch({
                type: ADD_FAV,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        };
    };
};

// Obtiene el detalle especifico de un juego;
export const detailVideoGame = (id) => {
    const endpoint = 'http://localhost:3001/videogames/' + id;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);

            return dispatch({
                type: VIDEOGAMES_DETAIL,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        };
    };
};

// Elimina un juego de favoritos;
export const deleteFav = (id) => {
    const endpoint = 'http://localhost:3001/videogames/fav' +id;
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(endpoint);

            return dispatch({
                type: DELETE_FAV,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        };
    };
};

// export const createVideoGame = (videogame) => {
//    const endpoint = 'http://localhost:3001/videogames'
//     return async (dispatch) => {
//     try {
//         const { data } = await axios.post(endpoint, videogame)
//         return dispatch({
//             type: CREATE_GAME,
//             payload: data,
//         });
//     } catch (error) {
//         console.log(error.message);
//     }
//    }
// }

// Limpia los detalles de un juego;
export const detailClean = () => {
   return { type: DETAIL_CLEAN };
};