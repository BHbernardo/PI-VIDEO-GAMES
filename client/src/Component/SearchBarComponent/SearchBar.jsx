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

  // obtenemos el estado de los juegos desde "Redux";
  const videogames = useSelector((state) => state.videogames);
  
  const dispatch = useDispatch();

  // Obtenemos la info de la URL aplicando el useLocation;
  const nameQueryParams = new URLSearchParams(useLocation().search);
  // Aca se obtiene el valor del parametro "name" de dicha URL;
  const name = nameQueryParams.get("name");

  // se aplica para obtener los juegos filtrados cuando la propiedad "name" cambia, se actualiza o se monta;
  useEffect(() => {
    dispatch(nameVg(name));
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