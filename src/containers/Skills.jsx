import React, { Fragment } from "react"
import Skill from "../components/Skill"
import "../styles/containers/Skills.css"
const Skills = () => {
  return (
    <Fragment>
      <div className="skills">
        <h2>SKILLS</h2>
        <div className="skills-container">
          <Skill
            title="Curso React.js"
            logoSkill="https://static.platzi.com/media/achievements/badge-react-2018-afc93257-48af-4e54-acaa-4d0433380f64.png"
            description="Aprende a desarrollar aplicaciones web, mobile y de escritorio con React.js, la librería JavaScript más popular en el mercado."
            place="platzi"
          />
          <Skill
            title="Curso de Bootstrap"
            logoSkill="https://static.platzi.com/media/achievements/1229-dbff8a06-bcca-48e9-98e3-1fd76d6216f3.png"
            description="Bootstrap es una biblioteca multiplataforma o conjunto de herramientas de código abierto para diseño de sitios y aplicaciones web."
            place="platzi"
          />
          <Skill
            title="Curso de Desarrollo Web Online"
            logoSkill="https://static.platzi.com/media/achievements/1350-09ddb033-354b-4c0c-84a4-56cbb71d0b08.png"
            description="Desarrollo web es un término que define la creación de sitios web para Internet o una intranet. Para conseguirlo se hace uso de tecnologías de software"
            place="platzi"
          />
          <Skill
            title="Curso de Frontend Developer"
            logoSkill="https://static.platzi.com/media/achievements/badge-frontend-developer-8a49e681-3e22-408d-b886-2f47dfc9953a.png"
            description="Frontend es la parte de un sitio web que interactúa con los usuarios, por eso decimos que está del lado del cliente."
            place="platzi"
          />
          <Skill
            title="Curso de HTML y CSS"
            logoSkill="https://static.platzi.com/media/achievements/badges-html-css-b0a71550-d5e7-4e27-aca2-f09f1321a517.png"
            description="En este curso aprenderemos gratis a maquetar sitios Web con HTML5 y a brindar estilos con CSS. "
            place="platzi"
          />
          <Skill
            title="Curso de React Router"
            logoSkill="https://static.platzi.com/media/achievements/1342-b3aca9a0-32a2-4d6b-ad81-9edf7f982fb5.png"
            description="React Router es una libería para gestionar rutas en aplicaciones que utilicen ReactJS. "
            place="platzi"
          />
          <Skill
            title="Curso Práctico de React JS"
            logoSkill="https://static.platzi.com/media/achievements/badge-react-adec89d0-1c35-4c9c-847e-18c284dc79dd.png"
            description="React.js es una librería JavaScript desarrollada por Facebook."
            place="platzi"
          />
          <Skill
            title="Curso Profesional de Git y GitHub"
            logoSkill="https://static.platzi.com/media/achievements/badge-github-0b729570-934d-47d8-ba6b-610d7f15e0ec.png"
            description="GitHub es una forja para alojar proyectos utilizando el sistema de control de versiones Git."
            place="platzi"
          />
        </div>
      </div>
    </Fragment>
  )
}
export default Skills