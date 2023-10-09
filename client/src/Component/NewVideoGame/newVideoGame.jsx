import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validation";
import { genresVg } from "../../redux/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./newVideoGames.css";

const NewVideoGames = () => {
  // Traemos los géneros de Redux
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(genresVg());
  }, [dispatch]);

  // Aquí se almacenarán los datos del nuevo juego
  const [form, setForm] = useState({
    name: "",
    releaseDate: "",
    genres: [],
    platforms: "",
    image: "",
    rating: "",
    description: "",
  });

  // Estado para manejar los errores de cada campo
  const [errors, setErrors] = useState({
    name: "",
    releaseDate: "",
    genres: "",
    platforms: "",
    image: "",
    rating: "",
    description: "",
  });

  // Manejador que se aplica cuando surge un cambio en los valores definidos
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
  
    setForm({
      ...form,
      [name]: value,
    });
  
    // Validación de dichos campos
    const updatedErrors = validation({
      ...form,
      [name]: value,
    },
      errors,
    );
  
    setErrors({
      ...errors,
      ...updatedErrors, // Actualizar los errores con los nuevos errores
    });
  };

  // Función que se ejecuta cuando se cambia el estado de un género con el checkbox
  const handleGenreChange = (event) => {
    const genreName = event.target.value;
    const isChecked = event.target.checked;

    let updatedGenres;

    // Si el checkbox está seleccionado, agregamos el género a la lista de géneros seleccionados
    if (isChecked) {
      updatedGenres = [...form.genres, genreName];
    } else {
      updatedGenres = form.genres.filter((genre) => genre !== genreName);
    }

    setForm({ ...form, genres: updatedGenres });

    // Validación por campo
    validation(
      {
        ...form,
        genres: updatedGenres,
      },
      errors,
      setErrors
    );
  };

  // Función para enviar el formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que se recargue la página y se pierda la información ingresada

    try {
      const response = await axios.post(
        "http://localhost:3001/videogames/"
        
      );
      alert("Video game created");

      // Redirigir al detalle del juego creado
       navigate(`/detail/${response.data.id}`);
    } catch (error) {
       alert("Error al crear el juego");
    }
  };

  return (
    <div className="form-general">
      <div className="page-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-left">
            <h1>NEW VIDEOGAME</h1>
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p>{errors.name}</p>}

            <label htmlFor="platforms">PLATFORMS</label>
            <input
              type="text"
              name="platforms"
              value={form.platforms}
              onChange={handleChange}
              required
            />
            {errors.platforms && <p>{errors.platforms}</p>}

            <fieldset>
              <legend>GENRES</legend>
              {genres.map((genre) => (
                <div key={genre.name}>
                  <input
                    type="checkbox"
                    name={genre.name}
                    value={genre.name}
                    checked={form.genres.includes(genre.name)}
                    onChange={handleGenreChange}
                  />
                  <span>{genre.name}</span>
                </div>
              ))}
            </fieldset>
            {errors.genres && <p>{errors.genres}</p>}

            <label htmlFor="releaseDate">RELEASE DATE:</label>
            <input
              type="date"
              name="releaseDate"
              value={form.releaseDate}
              onChange={handleChange}
              required
            />
            {errors.releaseDate && <p>{errors.releaseDate}</p>}
          </div>

          <div className="form-right">
            <label htmlFor="description">DESCRIPTION:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
            {errors.description && <p>{errors.description}</p>}

            <div>
              <label htmlFor="rating">RATING:</label>
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                required
              />
              {errors.rating && <p>{errors.rating}</p>}

              <button type="submit">CREATE NEW VIDEOGAME</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewVideoGames;