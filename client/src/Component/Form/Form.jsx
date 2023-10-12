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
  event.preventDefault(); // evita el envío del formulario y la recarga de la página

  // Valida el formulario cuando el usuario haga clic en "LOGIN"
  validation(form, errors, setErrors);

  if (errors.email || errors.password) {
    // Si hay errores de validación, no se enviará el formulario
    setLoginn("Correo o contraseña inválidos");
  } else {
    // Si no hay errores, se enviará el formulario
    const loginResult = await login(form);

    setAccess(loginResult.access);
    setLoginn(
      loginResult.access ? "" : "Correo o contraseña inválidos"
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