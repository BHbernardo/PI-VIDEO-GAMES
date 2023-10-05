// import { useEffect, useState } from "react";
// import { connect } from 'react-redux'
// import style from "./Card.module.css"
// import { addFav, deleteFav } from "../../redux/actions";

// const Card = ({
//     id,
//     userid,
//     name,
//     releasedate,
//     rating,
//     platforms,
//     image,
//     addFav,
//     deleteFav,
//     myFavorites,
// }) => {
//   const [isFav, setisFav] = useState(false);

//   useEffect(() => {
//       myFavorites.forEach((fav) => {
//         if (fav.id === id && fav.userid === userid) {
//           setisFav(true);
//         }
//       });
//     }, [myFavorites, id, userid]);

//   const handleFavorite = () => {
//     if(isFav) {
//         setisFav(false);
//         deleteFav(id);
//     }
//     else {
//         setisFav(true);
//         // Comprueba si el valor pasado por argumento es un array;
//         const plataformsVideoGame = Array.isArray(platforms)
//         ? platforms.join(", ") // ".join = va a separar todos los elementos del array con " , ";
//         : platforms;
//         addFav({
//             id, 
//             userid, 
//             name, 
//             releasedate, 
//             rating, 
//             platforms: plataformsVideoGame, 
//             image,
//         });
//     };
//   };

// // Chequea si el juego es favorito o no;
//     return (
//         <div className={style.card}>
//             <button onClick={handleFavorite}>{isFav? '❤️' : '🤍' }</button>
//             {/* <h2>ID: {id}</h2>
//             <h2>USEREID: {userid}</h2>
//             <h2>NAME: {name}</h2>
//             <h2>RELEASEDATE: {releasedate}</h2>
//             <h2>RATING: {rating}</h2>
//             <h2>PLATFORMS: {platforms}</h2>
//             <h2>IMAGE: {image}</h2> */}
//         </div>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//       myfavorites: state.myfavorites,
//     };
//   };
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       addFav: (character) => {
//         dispatch(addFav(character));
//       },
//       deleteFav: (id) => {
//         dispatch(deleteFav(id));
//       },
//     };
//   };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Card);

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addFav, deleteFav } from "../../redux/actions";
import "./Card.css";

const Card = ({
    id,
    userid,
    name,
    releaseDate,
    rating,
    platforms,
    image,
       
}) => {
  const [isFav, setisFav] = useState(false);

  // Obtenemos el estado 'myFavorites' del store utilizando useSelector;
  const myFavorites = useSelector((state) => state.myFavorites);
  
  // Obténemos la función 'dispatch' del store utilizando useDispatch;
  const dispatch = useDispatch();

// Chequea si el juego es favorito o no;
  useEffect(() => {
      myFavorites.forEach((fav) => {
        if (fav.id === id && fav.userid === userid) {
          setisFav(true);
        }
      });
    }, [myFavorites, id, userid]);

  // Funcion manejadora para agregar/sacar un juego de favoritos;
  const handleFavorite = () => {
    if (isFav) {
        setisFav(false);

  // Despacha la acción deleteFav con el id;
        dispatch(deleteFav(id));
  } else {
        setisFav(true);
        const plataformsVideoGame = Array.isArray(platforms)
          ? platforms.join(", ")
          : platforms;

  // Despacha la acción addFav con los datos del juego;
        dispatch(
          addFav({
            id, 
            userid, 
            name, 
            releaseDate, 
            rating, 
            platforms: plataformsVideoGame, 
            image,
          }),
        );
    };
  };

  return (
  <div className="card">
    <div className="image-container">
    <img src={image} alt={name} />
    </div>
    <div className="title">
    <h2>{name}</h2>
    </div>
    <p>Release Date: {releaseDate}</p>
    <p>Rating: {rating}</p>
    <p>Platforms: {platforms.join(", ")}</p>
    
  
    <div>
      <button  className="favorite-button" onClick={handleFavorite}>{isFav ? '❤️' : '🤍' }</button>
    </div>
  </div> 
  )
}

export default Card;
  
// import React from "react";

// function Card({
//   id,
//   userid,
//   name,
//   releaseDate,
//   rating,
//   platforms,
//   image
// }) {
//   return (
//     <div className="card">
//       <img src={image} alt={name} />
//       <div className="card-content">
//         <h2>{name}</h2>
//         <p>
//           <strong>Release Date:</strong> {releaseDate}
//         </p>
//         <p >
//           <strong>Rating:</strong> {rating}
//         </p>
//         <p>
//           <strong>Platforms:</strong> {platforms.join(", ")}
//         </p>
//         <p >
//           <strong>User ID:</strong> {userid}
//         </p>
//         <p >
//           <strong>ID:</strong> {id}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Card;

