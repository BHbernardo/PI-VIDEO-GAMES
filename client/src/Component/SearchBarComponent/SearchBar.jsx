import { useDispatch, useSelector } from "react-redux";
import { useUserContext } from "../../userContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { nameVg } from "../../redux/actions";
import Card from "../CardComponent/Card";
import "../CardsConteiner/Cards.css";

//! Componente para realizar la busqueda por "NOMBRE";

export default function SearchBar() {
  const { userid } = useUserContext();
  const videogames = useSelector((state) => state.videogames);
  console.log("Datos de videojuegos en el Redux Store:", videogames);
  const dispatch = useDispatch();
  const nameQueryParams = new URLSearchParams(useLocation().search);
  const name = nameQueryParams.get("name");

  useEffect(() => {
    try {
      dispatch(nameVg(name));
    } catch (error) {
      // Manejar el error, por ejemplo, actualizando el estado para mostrar un mensaje de error.
      console.error("Error al buscar juegos por nombre:", error);
    }
  }, [name, dispatch]);

  return (
    <div className="cards-container">
      <div className="cards">
        {videogames.length > 0 ? (
          videogames.map((videogame) => (
            <Card
              key={videogame.id}
              id={videogame.id}
              userid={userid}
              name={videogame.name}
              rating={videogame.rating}
              releaseDate={videogame.releaseDate}
              image={videogame.image}
              platforms={videogame.platforms}
            />
          ))
        ) : (
          <p>No se encontró ningún juego con el nombre {name}</p>
        )}
      </div>
    </div>
  );
}