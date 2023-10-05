import { useDispatch, useSelector } from "react-redux";
import Card from "../CardComponent/Card";
import { useEffect, useState } from "react";
import { addFav } from "../../redux/actions";
import { getVideoGames } from "../../redux/actions";
import "./Cards.css";

export default function Cards ({userid, sortOption, selectedGenres, selectedOrigin}) {
   
    const videogames = useSelector((state) => state.videogames); // estado inicial de los videogames;
    const myFavorites = useSelector((state) => state.myFavorites); // estado inicial de myFavorites;
    const dispatch = useDispatch(); // Función despachadora;

   const [isVideoGame, setVideoGame] = useState(true);

   useEffect(() => {
    const vgData = async () => {
        await Promise.all([
            dispatch(getVideoGames()),
            dispatch(addFav(userid)),
        ]);
        setVideoGame(false);
    };
    vgData();
   }, [dispatch, userid]);

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

  const currentItems = sortedVideogames.slice(ifirstone, ilastone)

  return (
    <>
      {isVideoGame ? (
        <div >
          
        </div>
      ) : (
        <div className="cards-container">
          <div className="cards">
            {currentItems.map((videogame) => {
              return (
                <Card
                  key={videogame.id}
                  id={videogame.id}
                  userid={userid}
                  name={videogame.name}
                  releaseDate={videogame.releaseDate}
                  rating={videogame.rating}
                  platforms={videogame.platforms}
                  image={videogame.image}
                  myFavorites={myFavorites}
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




// import React from 'react';
// import { useSelector } from "react-redux";
// import Card from "../CardComponent/Card";
// import { useEffect, useState } from "react";

// export default function Cards({ userid }) {
  
//   const videogames = useSelector((state) => state.videogames);

//   return (
//     <>
//           <div>
//             {videogames?.map((videogame) => {
//               return (
//                 <Card
//                   key={videogame.id}
//                   id={videogame.id}
//                   userid={userid}
//                   name={videogame.name}
//                   releaseDate={videogame.releaseDate}
//                   rating={videogame.rating}
//                   platforms={videogame.platforms}
//                   image={videogame.image}
//                 />
//               );
//             })}
//           </div>
//     </>
//   );
// }




// import React from 'react';
// import Card from '../Card/Card';
// import styles from './Cards.module.css';
// import { useSelector } from 'react-redux';


// function Cards() { 
   
//    const videogames = useSelector((state) => state.videogames);   
     
//    return(
//        <div className={styles.Cards_component}>
//            <div className={styles.Cards}>
             
//                { videogames?.map((element) => (
//                          <Card 
//                             key={ element.id }
//                             game={element}
//                          /> 
//                       ))
//                    } 
                       
//             </div>
//          </div>
//    );
// };

// export default Cards;