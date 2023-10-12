import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { genresVg } from '../../redux/actions';
import validation from './validation';
import './newVideoGames.css';
import axios from 'axios';

const NewVideoGames = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener el estado de los géneros desde Redux
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(genresVg());
  }, [dispatch]);
    
    const [form, setForm] = useState({
      name: "",
      image: "",
      description: "",
      platforms: "",
      releaseDate: "",
      rating: "",
      genres: [],
    });

    const [errors, setErrors] = useState({
      name: "",
      image: "",
      description: "",
      platforms: "",
      releaseDate: "",
      rating: "",
      genres: [],
    });
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setForm({
        ...form,
        [name]: value,
      });

      validation({ 
        ...form, 
        [name]: value 
      }, 
      errors, 
      setErrors);
    };
  
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
      validation({ 
        ...form, 
        genres: updatedGenres 
      }, 
        errors, 
        setErrors);
      }
      const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const response = await axios.post("http://localhost:3001/videogames", form);
          
          if (response.status === 201) {
            alert("Videogame Created");
            navigate(`/detail/${response.data.id}`);
          } else {
            alert("Error en la respuesta del servidor");
          }
        } catch (error) {
          if (error.response && error.response.status === 409) {
            // El servidor devolvió un código de estado 409 (Conflict) que indica que ya existe un juego con el mismo nombre.
            alert("Ya existe un juego con este nombre. Por favor, elige otro nombre.");
          } else {
            alert("Error al realizar la solicitud: " + error.message);
          }
        }
      };

        // axios
        // .post("http://localhost:3001/videogames", form)

        //    .then((res) => {
        //       console.log(res.data);
        //       alert("Se creo el juego")
        //    })
        //    .catch((error) => alert(error.message));
     
  
    return (
      <div className="form-general">
        <div className="page-container">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-left">
              <h1 htmlFor="nombre">CREATE VIDEOGAME</h1>
              <label htmlFor="nombre">NAME </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p>{errors.name}</p>}
              <label htmlFor="image">IMAGE (URL) </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                required
              />
              {errors.image && <p>{errors.image}</p>}
  
              <label htmlFor="platforms">PLATFORMS </label>
              <input
                type="text"
                name="platforms"
                value={form.platforms}
                onChange={handleChange}
                required
              />
              {errors.platforms && <p>{errors.platforms}</p>}
  
              <label htmlFor="releasedate">RELEASE DATE:</label>
              <input
                type="date"
                name="releaseDate"
                value={form.releaseDate}
                onChange={handleChange}
                required
              />
              {errors.releaseDate && <p>{errors.releaseDate}</p>}
              <div>
                <label htmlFor="rating">RATING </label>
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
              </div>
            </div>
  
            <div className="form-right">
              <label htmlFor="description">DESCRIPTION </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
              {errors.description && <p>{errors.description}</p>}
              <fieldset>
                <legend>GENRES </legend>
                {genres.map((genre) => {
                  return (
                    <div key={genre.id}>
                      <input
                        type="checkbox"
                        name={genre.name}
                        value={genre.name}
                        checked={form.genres.includes(genre.name)}
                        onChange={handleGenreChange}
                      />
                      <span name={genre.name}>{genre.name}</span>
                    </div>
                  );
                })}
              </fieldset>
              {errors.genres && <p>{errors.genres}</p>}
              <button type="submit">CREATE NEW VIDEOGAME</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  
  export default NewVideoGames;