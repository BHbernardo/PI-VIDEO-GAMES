import Card from "../CardComponent/Card";
import { useUserContext }  from "../../userContext";
import { useSelector } from "react-redux";

const Favorites = () => {
    const { userid } = useUserContext();

    const myFavorites = useSelector((state) => state.myFavorites);

    const favoritesUser = myFavorites.filter((fav) => fav.userid === userid);

    return (
        <div>
            {favoritesUser?.map(
                ({ id, userid, name, releaseDate, rating, platforms, image }) => {
                    return (
                        <Card
                           userid={userid}
                           name={name}
                           id={id}
                           releaseDate={releaseDate}
                           rating={rating}
                           platforms={platforms}
                           image={image}
                        />
                    )
                }
            )}
        </div>
    )
}

export default Favorites;