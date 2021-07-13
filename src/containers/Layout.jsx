import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderOviedo from "../components/HederOviedo";
import AboutMeOviedo from "../components/aboutMeOviedo";
import SkillOviedo from "../components/skillsOviedo";
import RandomMessage from "../components/RandomMessage";
import { useSelector, useDispatch } from "react-redux";
import enConstruccion from "../static/enConstruccion.jpg";

import "../styles/containers/Layout.scss";
const Layout = ({ children, match }) => {
  const viewRender = useSelector((state) => state.viewRender);
  const [viewRenderDisplay, setViewRenderDisplay] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setViewRenderDisplay(true);
    setTimeout(() => {
      setViewRenderDisplay(false);
    }, 2000);
  }, [viewRender]);
  useEffect(() => {
    fetch(
      `https://platzi-user-api.jecsham.com/api/v1/getUserSummary/@krisyupher`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({
          type: "SET_DATA_SKILL",
          payload: data.userData.courses,
        });
      })
      .catch(() => {
        console.log("Grave error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match]);
  return (
    <div className="ContainerLayout">
      {viewRender === "Home" ? (
        <div className="ContentContainer">
          <Header />
          {children}
          <Footer />
        </div>
      ) : (
        <div>
          <HeaderOviedo></HeaderOviedo>
          <AboutMeOviedo></AboutMeOviedo>
          <SkillOviedo></SkillOviedo>
          <img src={enConstruccion} alt="enConstruccion" />
        </div>
      )}
      <RandomMessage number={viewRender} Display={viewRenderDisplay} />
    </div>
  );
};
export default Layout;
