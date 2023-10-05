import Cards from "../CardsConteiner/Cards";
import { genresVg } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useUserContext } from "../../userContext";
import "./Home.css";

const Home = () => {
  
   const { userid } = useUserContext; 
   const genres = useSelector((state) => state.genres);
   const dispatch = useDispatch();

// Obtenemos los generos cuando se monta el componente;   
   useEffect(() => {
    dispatch(genresVg());
   }, [dispatch]);

   const [selectedGenres, setSelectedGenres] = useState([]);
   const [selectedOrigin, setSelectedOrigin] = useState("");
   const [sortOption, setSortOption] = useState("");
   const [showGenreMenu, setShowGenreMenu] = useState(false);

// Manejo de los cambios en los generos;
   const handleGenreFilters = (event) => {
    const genresName = event.target.value;
    if(selectedGenres.includes(genresName)) {
        setSelectedGenres(selectedGenres.filter((genre) => genre !== genresName));
    } else {
        setSelectedGenres([...selectedGenres, genresName]);
    }
  };

// Manejo en opciones de origen;  
   const handleOriginChange = (event) => {
     setSelectedOrigin(event.target.value);
   }

// Manejo en los cambios de opcion de clasificacion;   
   const handleSortChange = (event) => {
    setSortOption(event.target.value);
   }

// Funcion que resetea los filtros;   
   const resetFilter = () => {
    setSortOption("");
    setSelectedGenres([]);
    setSelectedOrigin("");
  };

  return (
  <div className="home-container">
    <div className="options-container"> 
        <button  className="reset-button" onClick={resetFilter}>
           CLEAR 
        </button>
   <div className="sort-container">
    <select
          className="sort-select"
          value={sortOption}
          onChange={handleSortChange}
        >
        <option value="1">NAME: A - Z</option>
        <option value="2">NAME: Z - A</option> 
        <option value="3">RATING: 5 - 0</option> 
        <option value="4">RATING: 0 - 5</option>     
    </select>
    </div>

    <div className="filter-container">
      <div className="genres-container"> 

    <button 
    className="genre-menu-button"
    onClick={() => setShowGenreMenu(!showGenreMenu)}
    >
     SELECT GENRES
    </button>
    {showGenreMenu && (
              <div className="genre-menu">
                {genres.map((genre) => (
                  <div key={genre.id}>
                    <input
                      type="checkbox"
                      value={genre.name}
                      checked={selectedGenres.includes(genre.name)}
                      onChange={handleGenreFilters}
                    />
                    <label>{genre.name}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
  <div className="origin-container"> 
    <select
         className="origin-select"
         value={selectedOrigin}
         onChange={handleOriginChange}
    >
       <option value="1">API</option> 
       <option value="2">BASE DE DATOS</option>     
    </select>
    </div>
    </div>
    </div>

    <Cards
      userid={userid}
      sortOption={sortOption}
      selectedGenres={selectedGenres}
      selectedOrigin={selectedOrigin}
    />
   </div>
);



};

export default Home
