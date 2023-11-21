import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames } from "../../redux/actions";
import Card from "../CardComponent/Card";
import "./Cards.css";

const Cards = ({ userid, sortOption, selectedGenres, selectedOrigin }) => {
  const videogames = useSelector((state) => state.videogames); // estado inicial de los videogames;
  const dispatch = useDispatch(); // Función despachadora;

  const [isVideoGame, setVideoGame] = useState(true);

  useEffect(() => {
    const vgData = async () => {
      await dispatch(getVideoGames());
      setVideoGame(false);
    };
    vgData();
  }, [dispatch]);

  // Paginado;
  const [currentPage, setCurrentPage] = useState(1);
  const itemspage = 15; // cantidad de juegos;
  const ilastone = currentPage * itemspage; // proporciona el limite "SUPERIOR" de elementos que se mostraran en home;
  const ifirstone = ilastone - itemspage; // proporciona el limite "INFERIOR";

  // Filtrado;

  // creamos un nuevo array y aplicamos un filter para recorrer cada elemento de los juegos;
  const filteredVideogames = videogames.filter((videogame) => {
    // verifica los generos seleccionados;
    const matchesSelectedGenres =
    // si no se seleccionan generos se aplica una coincidencia automatica;
      selectedGenres.length === 0 ||
    // verifica si todos los generos estan incluidos en los generos de los juegos;  
      selectedGenres.every((genre) => videogame.genres.includes(genre));

    // verifica si la opcion de origen coincide con el identificador;  
    const matchesSelectedOrigin =
      selectedOrigin === "" ||
      // si es 1, verifica que el id del juego sea un numero, osea proviene de la api;
      (selectedOrigin === "1" && typeof videogame.id === "number") || // API
      // si es 2, verifica que el id del juego sea un string, osea proviene de la BDD;
      (selectedOrigin === "2" && typeof videogame.id === "string"); // DB

    // el juego debe "CUMPLIR", con las condiciones de "genero" y "origen";
    return matchesSelectedGenres && matchesSelectedOrigin;
  });

  // Ordenamiento;
  const sortedVideogames = [...filteredVideogames]; // realiza una copia para evitar que los cambios en el ordenamiento afecto al filtrado;

  if (sortOption === "1") {
    // ordenamiento (A - Z);
    sortedVideogames.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "2") {
    // ordenamiento (Z - A);
    sortedVideogames.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "3") {
    // ordenamiento (5 - 0);
    sortedVideogames.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "4") {
    // ordenamiento (0 - 5);
    sortedVideogames.sort((a, b) => a.rating - b.rating);
  }

  const currentItems = sortedVideogames.slice(ifirstone, ilastone);

  return (
    <>
      {isVideoGame ? (
        <div></div>
      ) : (
        <div className="cards-container">
          <div className="cards">
            {currentItems.map((videogame) => {
              return (
                <Card
                  key={videogame.id}
                  id={videogame.id}
                  name={videogame.name}
                  platforms={videogame.platforms}
                  image={videogame.image}
                />
              );
            })}
          </div>
          <div className="buttons-container">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              Anterior
            </button>
            <button
              disabled={ilastone >= sortedVideogames.length}
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo(0, 0);
              }}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;

