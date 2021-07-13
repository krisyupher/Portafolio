import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Skill from "../components/Skill";
import "../styles/containers/Skills.css";
const Skills = () => {
  const skills = useSelector((state) => state.skills);

  return (
    <Fragment>
      <div className="skills">
        <h2>SKILLS</h2>
        <div className="skills-container">
          {skills.map((item) => {
            return (
              <Skill
                title={item.title}
                logoSkill={item.badge}
                description={item.career}
                link={item.diploma_link}
                place="platzi"
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default Skills;
