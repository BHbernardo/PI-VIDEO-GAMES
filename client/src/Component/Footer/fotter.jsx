import './fotter.css';

const Fotter = () => {
   return (
    <fotter className="footer">
       <p>© 2023 Bern4!. TODOS LOS DERECHOS RESERVADOS.</p>
       <p>
        <a href='/about'>ACERCA DE MI</a> | {" "}
        <a
          href='https://www.linkedin.com/in/bernardo-heduvan-b953b2231/'
          target='_blank'
          rel='noopener noreferrer'
        >
         CONTACTO
        </a>
       </p>
    </fotter>
   )
}

export default Fotter;