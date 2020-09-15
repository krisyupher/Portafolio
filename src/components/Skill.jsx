import React, { Fragment } from "react"
import "../styles/components/Skill.css"
const Skill = (props) => {
  const { title, logoSkill, description, place } = props;
  return (
    <Fragment>
      <div className="Skill">
        <div className="container-imagen">
          <img src={logoSkill} alt=""/>
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