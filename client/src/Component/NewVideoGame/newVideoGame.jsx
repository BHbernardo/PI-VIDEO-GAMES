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

  // Efecto para obtener los generos cuando el componente se monta o actualiza;
  useEffect(() => {
    dispatch(genresVg());
  }, [dispatch]);
   
  // Estado en el cual se van a almacenar los valores del formulario;
    const [form, setForm] = useState({
      name: "",
      image: "",
      description: "",
      platforms: "",
      releaseDate: "",
      rating: "",
      genres: [],
    });

  // Estado para almacenar los errores correspondientes al formulario;  
    const [errors, setErrors] = useState({
      name: "",
      image: "",
      description: "",
      platforms: "",
      releaseDate: "",
      rating: "",
      genres: [],
    });
  
    // Funcion que se va a encargar de manejar los cambio en cada campo;
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setForm({
        ...form,
        [name]: value,
      });

    // Aplicamos las validaciones correspondientes;
      validation({ 
        ...form, 
        [name]: value 
      }, 
      errors, 
      setErrors);
    };
  
  // Funcion que se va a ejecutar cuando se cambia el estado de un genero con el checkbox;  
    const handleGenreChange = (event) => {
      const genreName = event.target.value; // identifica el genero seleccionado;
      const isChecked = event.target.checked; // identifica si esta seleccionado o no;
  
      let updatedGenres; // lista actualizada de los generos;
  
      // Si el checkbox está seleccionado, agregamos el género a la lista de géneros seleccionados
      if (isChecked) {
        updatedGenres = [...form.genres, genreName];
      } else {
        updatedGenres = form.genres.filter((genre) => genre !== genreName);
      }
      // actualiza el estado con la nueva lista;
      setForm({ ...form, genres: updatedGenres });
  
      // Validación por campo de la lista actualizada;
      validation({ 
        ...form, 
        genres: updatedGenres 
      }, 
        errors, 
        setErrors);

      // Validación adicional para verificar que al menos un género esté seleccionado;
      const hasSelectedGenre = updatedGenres.length > 0;
      if (!hasSelectedGenre) {
        setErrors((errors) => ({...errors,genres: "Por favor selecciona al menos un género",}));
      } else {
        setErrors((errors) => ({ ...errors, genres: "" }));
      }
      }

      // Funcion que se va a ejecutar cada vez que se envie el formulario de creacion;
      const handleSubmit = async (event) => {
        event.preventDefault(); // permite que no se recargue la pag y no perder la informacion aplicada;
        
        try {
          const response = await axios.post(
            "http://localhost:3001/videogames", 
            form
            );
          alert("Videogame Created");
          // Ruta para navegar en el detalle del juego creado una vez enviado el formulario;
          navigate(`/detail/${response.data.id}`);
        } catch (error) {
            alert("Error al realizar la solicitud");
          }
        }
  
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