import React, { Fragment } from "react"
import "../styles/components/Skill.scss"
const Skill = (props) => {
  const { title, logoSkill, description, place, link } = props;
  return (
    <Fragment>
      <div className="Skill">
        <div className="container-imagen">
          <a href={`https://platzi.com${link}`} target="_blank">
            <img src={logoSkill} alt={logoSkill} />
          </a>
          <h4>{place}</h4>
        </div>
        <div className="Skill-Container">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </Fragment>
  )
}
export default Skill