import { useDispatch, useSelector } from "react-redux";
import { detailVideoGame } from "../../redux/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { detailClean } from "../../redux/actions";
import "./Detail.css";

import gameconsoleIcon from "../../resource/icons/gameconsole.png";
import pcIcon from "../../resource/icons/pc.png";
import playstationIcon from "../../resource/icons/playstation.png";
import smartphoneIcon from "../../resource/icons/smartphone.png";
import xboxIcon from "../../resource/icons/xbox.png";



const Detail = () => {
   
  // Obtenemos los detelles de los juegos desde el estado de "Redux";
    const videogamedetail = useSelector((state) => state.videogamedetail);
    const dispatch = useDispatch();

    const { id } = useParams();

    // Se aplica para obtener los detalles del juego cuando el componente se monta;
    // o cuando el parametro del id cambia;
    useEffect(() => {
        const data = async () => {
            await Promise.all([
                dispatch(
                    detailVideoGame(id)
                    )]);
        }
    
    // Se aplica para hacer una limpieza de los detalles del juego cuando se desmonta;    
    data();
    return () => dispatch(detailClean());
    }, [id, dispatch]);

  // Renderizar las estrellas
  const renderStars = () => {

    // número máximo de estrellas
    const maxRating = 5;

    // Esto representa el número de estrellas llenas, se calcula tomando la parte entera;
    const filledStars = Math.floor(videogamedetail.rating);

    // verifica si hay una estrella "media llena" en caso de que "rating" no sea un número entero;
    const hasHalfStar = videogamedetail.rating % 1 !== 0;

    // array donde se van a almacenar las estrellas;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {

      // almacena la clase CSS que se aplicará a cada estrella.
      let starClass = "star";

     // representa las estrellas llenas
      starClass += i <= videogamedetail.rating ? " filled" : "";

      if (i === filledStars + 1 && hasHalfStar) {
        starClass += " half-filled";
      }

      stars.push(
        <span key={i} className={starClass}>
          ★
        </span>
      );
    }

    return stars;
  };


  //Arreglar el texto de la descripcion
  const processDescription = (description) => {
    if (!description) {
      return null;
    }
  
    let processedDescription = description;

    const espanolIndex = description.indexOf("Español");

    if (espanolIndex !== -1) {
      processedDescription = description.substring(0, espanolIndex);
    }
    return processedDescription 
}

// Utiliza esta expresión regular para eliminar las etiquetas HTML
const cleanDescription = (description) => {
  if (!description) {
    return null;
  }
  return description.replace(/<[^>]*>/g, '');
}

// De esta manera obtenemos los iconos de las distintas plataformas;
const getplatIcons = (platforms) => {

  const platformsKey = Array.isArray(platforms)
  // si hay multiples plataformas, se forma una cadena de ellas separadas por una " , ";
  // luego se convierten en minuscula
    ? platforms.join(", ").toLowerCase()
  // sino simplemente se convierten en minuscula;
    : platforms.toLowerCase();

    // va a almacenar los iconos de las plataformas;
  const platformsIcons = [];

// verifica si la plataforma icnluye el string detallado, si es asi agrega el icono;
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
  <div>
    <div className="detail-general">
      <div className="detail-container">
        <button className="detail-button" onClick={() => window.history.back()}>
          BACK
        </button>

        <div className="detail-left">
          <h1>{videogamedetail.name}</h1>
          <img
            className="detail-image"
            src={videogamedetail.image}
            alt={videogamedetail.name}
          />
          <p>
            {cleanDescription(
              processDescription(
                videogamedetail.description
                  ? videogamedetail.description
                  : "There's no game with that ID"
              )
            )}
          </p>
        </div>

        <div className="detail-right">
  <div className="detail-info">
    <div className="detail-info-left">
      <h4>Rating</h4>
      <div className="star-rating"> {renderStars()}</div>
      <h4>Platforms</h4>
      <div className="platform-icons">
        {videogamedetail.platforms && getplatIcons(videogamedetail.platforms)}
      </div>
    </div>
    <div className="detail-info-right">
      <h4>Release Date</h4>
      <p>{videogamedetail.releaseDate}</p>
      <h4>Genres</h4>
      <span style={{ fontWeight: "bold" }}>
        {videogamedetail.genres ? (
          videogamedetail.genres.map((genre) => <span key={genre}> {genre}</span>)
        ) : (
          <span>No genres available</span>
        )}
      </span>
    </div>
  </div>
</div>
    </div>
  </div>
  </div>
);
}


export default Detail;