import React, { Fragment, useState, useEffect } from "react"
import Skill from "../components/Skill"
import "../styles/containers/Skills.css"
const Skills = ({ match}) => {
  const [course, setCourse] = useState([]);
  const getUserSummary = () => {
    fetch(`https://platzi-user-api.jecsham.com/api/v1/getUserSummary/@krisyupher`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      setCourse(data.userData.courses)
    })
    .catch(() => {
      console.log("Grave error")
    })
  }
  useEffect(() => {
		getUserSummary()
	}, [match])
  return (
    <Fragment>
      <div className="skills">
        <h2>SKILLS</h2>
        <div className="skills-container">
          {course.map((item) => {
            return (
              <Skill
                title={item.title}
                logoSkill={item.badge}
                description={item.career}
                link={item.diploma_link}
                place="platzi"
                key={item.id}
              />
            )
          })}
        </div>
        {console.log(course)}
        
      </div>
    </Fragment>
  )
}
export default Skills