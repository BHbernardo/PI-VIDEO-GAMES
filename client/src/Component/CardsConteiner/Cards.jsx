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
  const itemspage = 15;
  const ilastone = currentPage * itemspage;
  const ifirstone = ilastone - itemspage;

  // Filtrado y Ordenamiento;
  const filteredVideogames = videogames.filter((videogame) => {
    const matchesSelectedGenres =
      selectedGenres.length === 0 ||
      selectedGenres.every((genre) => videogame.genres.includes(genre));

    const matchesSelectedOrigin =
      selectedOrigin === "" ||
      (selectedOrigin === "1" && typeof videogame.id === "number") || // API
      (selectedOrigin === "2" && typeof videogame.id === "string"); // DB

    return matchesSelectedGenres && matchesSelectedOrigin;
  });

  const sortedVideogames = [...filteredVideogames];

  if (sortOption === "1") {
    sortedVideogames.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "2") {
    sortedVideogames.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "3") {
    sortedVideogames.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "4") {
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

