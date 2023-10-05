import { 
    ADD_FAV, 
    DELETE_FAV, 
    GENRES_VIDEOGAMES, 
    GET_VIDEOGAMES, 
    VIDEOGAMES_DETAIL,
    VIDEOGAMES_NAME,
} from "./actions.types";

const initialState = { // ESTADO INICIAL;
    videogames: [],
    videogamedetail: {},
    myFavorites: [],
    genres: [],
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
    
     case GET_VIDEOGAMES:
        return {
            ...state,
            videogames: action.payload,
        }

     case GENRES_VIDEOGAMES:
        return {
            ...state,
            genres: action.payload,
        }
        
     case VIDEOGAMES_NAME:
        return{
            ...state,
            videogames: action.payload,
        }
        
     case VIDEOGAMES_DETAIL:
        return {
            ...state,
            videogamedetail: action.payload,
        }
        
     case ADD_FAV:
        return {
            ...state,
            myFavorites: action.payload,
        }  
        
     case DELETE_FAV:
        return {
            ...state,
            myFavorites: action.payload,
        }   
    
    default: 
        return {
            ...state,
        }
   }
}

export default reducer;