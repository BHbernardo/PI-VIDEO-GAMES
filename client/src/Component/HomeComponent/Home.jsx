import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genresVg } from "../../redux/actions";
import { useUserContext } from "../../userContext";
import "./Home.css";
import Cards from "../CardsConteiner/Cards";

const Home = () => {
  const { userid } = useUserContext();

  // obtenemos los generos desde el estado de Redux;
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  // Obtenemos los generos cuando se carga el componente;
  useEffect(() => {
    dispatch(genresVg()); // cuando se monta se dispara la accion;
  }, [dispatch]);

  // estados para aplicar en los "filtros" y "opciones" de clasificacion;

  // Almacena los géneros seleccionados;
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  // Almacena la opción de origen seleccionada;
  const [selectedOrigin, setSelectedOrigin] = useState("");

  // Almacena la opción de clasificación seleccionada;
  const [sortOption, setSortOption] = useState("");

  // Controla la visibilidad de un menú desplegable de los géneros;
  const [showGenreMenu, setShowGenreMenu] = useState(false);

  // Manejador de cambios en los generos;
  const handleGenreFilters = (event) => {
    // Toma el nombre del género que se ha seleccionado o deseleccionado.
    const genreName = event.target.value;
  
    // Utiliza la función `setSelectedGenres` para actualizar el estado `selectedGenres`.
    setSelectedGenres((prevSelectedGenres) => {
      // Verifica si el género ya está incluido en la lista de géneros seleccionados.
      if (prevSelectedGenres.includes(genreName)) {
        // Si el género ya está incluido, lo elimina de la lista de géneros seleccionados.
        return prevSelectedGenres.filter((genre) => genre !== genreName);
      } else {
        // Si el género no está incluido, agrega el género a la lista de géneros seleccionados.
        return [...prevSelectedGenres, genreName];
      }
    });
  };

  // Manejador de cambios en la opcion de origen;
  const handleOriginChange = (event) => {
    // lanza un evento cuando cambia el origen;
    setSelectedOrigin(event.target.value); // origen por = API o BDD;
  };

  // Manejador de cambios en la opcion de clasificacion;
  const handleSortChange = (event) => {
    // lanza un evento cuando se quiere cambiar la opcion de ordenamiento;
    setSortOption(event.target.value); // ordenar por = (A - Z, Z - A), (0 - 5, 5 - 0);
  };

  // Resetea a valores predeterminados los filtros y opciones;
  const resetFilter = () => {
    setSortOption("");
    setSelectedGenres([]);
    setSelectedOrigin("");
  };

  return (
    <div className="home-container">
      <div className="options-container">
        <button className="reset-button" onClick={resetFilter}>
          REFRESH
        </button>
        <div className="sort-container">
          <select
            className="sort-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="">ORDER BY</option>
            <option value="1">A - Z</option>
            <option value="2">Z - A</option>
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
              GENRES
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

export default Home;