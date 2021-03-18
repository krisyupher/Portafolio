import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WorkPoster.scss";
const WorkPoster = (props) => {
  const { title, poster, description, link, date, github } = props;
  return (
    <a href={link} target="_blank" className="WorkContainer">
      <img src={poster} alt={poster} />
      <div className="Work_ContainerData">
        <div className="titleContainer">
          <a href={github}>
            <FontAwesomeIcon icon={faGithub} className="FontAwesomeIcon" />
          </a>
          <div>
            <h3>{title}</h3>
            <span>{date}</span>
            <hr />
          </div>
        </div>
        <p>{description}</p>
      </div>
    </a>
  );
};
export default WorkPoster;
