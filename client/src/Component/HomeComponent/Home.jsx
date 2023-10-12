import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genresVg } from "../../redux/actions";
import { useUserContext } from "../../userContext";
import "./Home.css";
import Cards from "../CardsConteiner/Cards";

const Home = () => {
  const { userid } = useUserContext();
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(genresVg());
  }, [dispatch]);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showGenreMenu, setShowGenreMenu] = useState(false);

  const handleGenreFilters = (event) => {
    const genreName = event.target.value;
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreName)) {
        return prevSelectedGenres.filter((genre) => genre !== genreName);
      } else {
        return [...prevSelectedGenres, genreName];
      }
    });
  };

  const handleOriginChange = (event) => {
    setSelectedOrigin(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

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