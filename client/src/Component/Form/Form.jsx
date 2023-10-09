import { useEffect, useState } from "react"
import validation from "./validation";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../userContext";
import "./Form.css";

const Form = () => {

   const { login } = useUserContext();
   const navigate = useNavigate();

// Estado para guardar los valores de 'EMAIL' y 'PASSWORD';
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

// Estado para guardar los errores correspondientes a tanto para el 'email' o 'password';
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

// Funcion que se ejecuta cada vez que se cambia un valor;
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({
        ...form,
        [name]: value // modifica cualquier cosa del evento;
        //NAME= correo/password--//-- EMAIL/CONTRASEÑA que le enviemos;
    });

// Valicacion por cada campo;
    validation({ ...form, [name]: value }, errors, setErrors);
  };

// Estados para controlar el acceso;  
const [access, setAccess] = useState(false);
const [loginn, setLoginn] = useState("");

useEffect(() => {
   !access && navigate("/login");
}, [access, navigate]);

// Funcion para enviar el formulario; 
const handleSubmit = async (event) => {
  event.preventDefault(); // permite que no se recargue la pag y no perder la informacion aplicada;  

  // Verifica si hay errores en la validación antes de enviar la solicitud al servidor
  if (errors.email || errors.password) {
    // Si hay errores de validación, no envíes la solicitud
    setLoginn("Invalid email or password");
  } else {
    // Si no hay errores de validación, envía la solicitud al servidor
    const loginResult = await login(form);

    setAccess(loginResult.access);
    setLoginn(
      loginResult.access ? "" : "Invalid email or password"
    );
  }
};

  return (
    <div className="formulario-container">   
       <form onSubmit={handleSubmit}>
         <label htmlFor="email">EMAIL: </label>
         <input 
           type="text"
           name="email"
           value={form.email}
           onChange={handleChange}
         />
         {errors.email && <p>{errors.email}</p>}

         <label htmlFor="password">PASSWORD: </label>
         <input 
           type="password"
           name="password"
           value={form.password}
           onChange={handleChange}
         />
        {errors.password && <p>{errors.password}</p>}

        <button type="submit">LOGIN</button>
        {loginn && <p>{loginn}</p>}
        
       </form> 
    </div>
  )

}

export default Form;