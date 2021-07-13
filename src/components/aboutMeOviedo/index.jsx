import React from "react";
import sobreMiIMG from "../../static/sobreMiIMG.png";

import "./index.scss";
const AboutMeOviedo = () => {
  return (
    <div className="AboutMeOviedo" id="AboutMeOviedo">
      <img src={sobreMiIMG} alt="sobreMiIMG" />
      <div className="textContainer">
        <h1>Sobre mi vida</h1>
        <p>
          Soy un desarrollador de software con dos años de experiencia
          utilizando tecnologias de desarrollo como Angular, React y Ionic para
          la construccion de aplicativos. Cuidando que el aplicativo tenga una
          buena interfaz, sea atractiva y intuitiva para el usuario final.{" "}
        </p>
      </div>
    </div>
  );
};
export default AboutMeOviedo;
