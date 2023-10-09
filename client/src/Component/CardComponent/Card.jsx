
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addFav, deleteFav } from "../../redux/actions";
import "./Card.css";
import { Link } from "react-router-dom";

import gameconsoleIcon from "../../resource/icons/gameconsole.png";
import pcIcon from "../../resource/icons/pc.png";
import playstationIcon from "../../resource/icons/playstation.png";
import smartphoneIcon from "../../resource/icons/smartphone.png";
import xboxIcon from "../../resource/icons/xbox.png";

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


  // De esta manera obtenemos los iconos de las distintas plataformas;
  const getplatIcons = (platforms) => {
    const platformsKey = Array.isArray(platforms)
      ? platforms.join(", ").toLowerCase()
      : platforms.toLowerCase();
  
    const platformsIcons = [];
  
    if (platformsKey.includes("pc")) {
      platformsIcons.push(pcIcon);
    }
    if (platformsKey.includes("gameconsole")) {
      platformsIcons.push(gameconsoleIcon);
    }
    if (platformsKey.includes("playstation")) {
      platformsIcons.push(playstationIcon);
    }
    if (platformsKey.includes("xbox")) {
      platformsIcons.push(xboxIcon);
    }
    if (platformsKey.includes("smartphone")) {
      platformsIcons.push(smartphoneIcon);
    }
  
    return (
      <>
        {platformsIcons.map((icon) => (
          <img
            key={icon}
            src={icon}
            alt={"icon"}
          />
        ))}
      </>
    );
  };

  
  return (
  <div className="card">
    <div className="image-container">
    <img src={image} alt={name} />
    </div>
   <Link to={`/detail/${id}`}>
    <div className="title">
    <h2>{name}</h2>
    </div>
    <div className="platform-icons">{getplatIcons(platforms)}</div>
   </Link> 
    
  </div> 
  )
}

export default Card;
  

