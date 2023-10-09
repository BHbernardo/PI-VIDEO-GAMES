import "./About.css";

const About = () => {
    return (
        <div className="about-general">
            <div className="about-container">
                <div className="about-text">
                    <button
                      className="about-button"
                      onClick={() => window.history.back()}
                    >
                      BACK
                    </button> 
                </div>
                <div className="about-content">
                    <div>
                        <h1>ABOUT ME</h1>
                        <p>
                        Hi, I'm Bernardo Heduvan, I'm 24 years old and 
                        I'm really excited to present my individual project to you. 
                        </p>
                        <p>
                        In order to build the design structure of this website 
                        I implemented both HTML and CSS technologies.   
                        </p>
                        <p>
                        I also made use of the JavaScript language and used a highly recommended library which is "REACT" for 
                        reusable components which makes management more efficient.
                        </p>
                        <p>
                        Finally I have applied the use of other tools such as Express, Axios, SQL, Sequelize and others. In short, the project is a combination of HTML, 
                        CSS and JavaScript knowledge with their additional tools.
                        </p>
                        <p>
                        Contact { " " }
                        <a
                        href="https://www.linkedin.com/in/bernardo-heduvan-b953b2231/?originalSubdomain=ar"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>{" "}
                        Thank you for your time, I hope you like my project.
                        </p>
                        </div>
                    </div>
                    <div className="about-image">
                        <img
                        href="https://ibb.co/wWnbtkF"
                        src="https://i.ibb.co/2tzLJ91/slak.jpg" 
                        alt="me" 
                        >
                        </img>
                    </div>     
               </div>
            </div>   
    )
}

export default About;