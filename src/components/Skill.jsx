import React, { Fragment } from "react";
import "../styles/components/Skill.scss";
const Skill = (props) => {
  const { title, logoSkill, description, place, link, backGround = "" } = props;
  return (
    <Fragment>
      <div className={backGround === "Black" ? "SkillBlack" : "SkillWhite"}>
        <div className="container-imagen">
          <a
            href={`https://platzi.com${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logoSkill} alt={logoSkill} />
          </a>
        </div>
        <div className="Skill-Container">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </Fragment>
  );
};
export default Skill;
