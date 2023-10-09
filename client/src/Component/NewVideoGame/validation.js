

const validation = (form, errors) => {
    
    // Validación para el nombre;
    let nombreError = "";
    if(!form.name) {
        nombreError = "Campo Obligatorio";
    } else nombreError = "";

    // Validación para los generos;
    let generoError = "";
    if(!form.genres || form.genres.length === 0) {
        generoError = "Seleccione al menos un género";
    }

    // Validación para la descripción;
    let descriptionError = "";
    if(!form.description) {
        descriptionError = "Campo Obligatorio";
    } else if (form.description.length > 300) {
        descriptionError = "No debes excederte de los 300 caracteres";
    } else if (form.description.length < 15) {
        descriptionError = "La descripción no debe ser menor a 15 caracteres";
    } else descriptionError = "";

    // Validación para las plataformas;
    let plataformaError = "";
    if(!form.platforms) {
        plataformaError = "Campo Obligatorio";
    } else plataformaError = "";

    // Validación para la fecha de lanzamiento;
    let fechaError = "";
    if(!form.releaseDate) {
        fechaError = "Indique una fecha porfavor";
    } else fechaError = "";

    // Validación para los rating;
    let ratingError = "";
    if(!form.rating) {
        ratingError = "Ingrese un rating correspondiente";
    } else if (form.rating < 0 || form.rating > 5) {
        ratingError = "Debe tener rango entre 0 y 5";
    } else ratingError = "";

    // Validación para la imagen;
    let imagenError = "";
    if(!form.image) {
        imagenError = "Campo Obligatorio";
    } else if (!/^https?:\/\/\S+$/.test(form.image)) {
        imagenError = "URL inválida";
    } imagenError = "";

    errors.name = nombreError;
    errors.genres = generoError;
    errors.description = descriptionError;
    errors.platforms = plataformaError;
    errors.releaseDate = fechaError;
    errors.rating = ratingError;
    errors.image = imagenError;

}
export default validation;