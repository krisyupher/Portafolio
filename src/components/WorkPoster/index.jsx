import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuantumConnexion from "../../static/QuantumConnexion.png";
import "./WorkPoster.scss";
const WorkPoster = (props) => {
  const { title, poster, description, linkView, date, Link } = props;
  return (
    <a
      href={linkView}
      target="_blank"
      rel="noopener noreferrer"
      className="WorkContainer"
    >
      <img src={poster} alt={poster} />
      <div className="Work_ContainerData">
        <div className="titleContainer">
          <a href={Link} target="_blank">
            {Link.startsWith("https://github") ? (
              <FontAwesomeIcon icon={faGithub} className="FontAwesomeIcon" />
            ) : (
              <img
                className="logo"
                src={QuantumConnexion}
                alt="logoQuantumConnexion"
              />
            )}
          </a>
          <a href={Link} target="_blank">
            <h3>{title}</h3>
            <span>{date}</span>
            <hr />
          </a>
        </div>
        <p>{description}</p>
      </div>
    </a>
  );
};
export default WorkPoster;
