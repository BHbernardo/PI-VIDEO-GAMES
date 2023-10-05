const validation = (form, errors, setErrors) => {
   // EMAIL;
    let emailError = "";
    if(!form.email) {
        emailError = "Please complete this field.";
    } else if (form.email.length > 30) {
        emailError = "You cannot exceed 30 characters.";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{3})+$/.test(form.email)) {
        emailError = "Invalid email.";
    }

   // PASSWORD;
    let passwordError = "";
    if(!form.password) {
        passwordError = "Please complete this field.";
    } else if (form.password.length < 6 || form.password.length > 12) {
        passwordError = "Invalid password length.";
    } else if (!/\d/.test(form.password)) {
        passwordError = "Must contain at least on number";  
    }
}

export default validation;