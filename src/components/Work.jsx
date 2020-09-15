import React, { Fragment } from "react"
import "../styles/components/Work.css"
const Work = (props) => {
  const { title, poster, funcionamiento, description, link } = props;
  return (
    <Fragment>
      <div className="Work">
        <a href={link} className="poster" target="blank">
          <img src={poster} alt={title} />
        </a>
        <div className="Work-description">
          <h3>{title}</h3>
          <p className="funcionamiento">{funcionamiento}</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </Fragment>
  )
}
export default Work