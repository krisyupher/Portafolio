import React from "react"
import "../styles/components/Work.scss"
const Work = (props) => {
  const { title, poster, description, link } = props;
  return (
    <a href={link} target="_blank" className="WorkContainer">
      <div className="Work_CotainerImagen">
        <img src={poster} alt={poster} />
      </div>
      <div className="Work_ContainerData">
        <h3>{title}</h3>
        <hr />
        <p>{description}</p>
      </div>
    </a>
  )
}
export default Work