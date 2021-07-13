import React from "react";
import { useDispatch } from "react-redux";

import "./index.scss";
const HeaderOviedo = () => {
  const dispatch = useDispatch();

  const togleView = (min, max) => {
    const result = Math.round(Math.random() * (max - min) + min);
    let view;
    if (result === 1) {
      view = "Home";
    } else {
      view = "designByAndresOviedo";
    }
    dispatch({
      type: "SET_VIEW_RENDER",
      payload: view,
    });
  };
  return (
    <header>
      <div
        className="textContainer"
        onClick={() => {
          togleView(1, 2);
        }}
      >
        <h1 className="textWhite">Cristian</h1>
        <h1 className="textOrange">Florez</h1>
      </div>
      <nav>
        <a href="#AboutMeOviedo">Sobre mí</a> |<a>Home</a> |<a>Portafolio</a> |
        <a href="#SkillOviedo">Habilidades</a>|<a>Contáctame</a>
      </nav>
    </header>
  );
};
export default HeaderOviedo;
