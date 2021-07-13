import React from "react";
import Skill from "../Skill";
import { useSelector } from "react-redux";
import "./index.scss";
const SkillOviedo = () => {
  const skills = useSelector((state) => state.skills);
  return (
    <div className="SkillOviedo" id="SkillOviedo">
      <div className="Border"></div>
      <h1>Habilidades</h1>
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
              backGround="Black"
            />
          );
        })}
      </div>
    </div>
  );
};

export default SkillOviedo;
