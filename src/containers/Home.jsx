import React from "react";
import Hero from "../components/Hero";
//style
import "../styles/containers/Home.css";
// import AboutMe from "../components/AboutMe"
const Home = () => {
  setTimeout(() => {
    var c = document.getElementById("MyCanvasLinesLayout");
    var ctx = c.getContext("2d");
    for (let i = 0; i < 30; i++) {
      ctx.moveTo(0, i * 30);
      ctx.lineTo(i * 30, 0);
      ctx.strokeStyle = "#64cbe6";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    const rows = 4;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        /* ctx.arc(95, 50, 40, 0, 2 * Math.PI); */
        ctx.arc(
          (i + 4.5) * (c.width / (rows + 8)),
          (j + 6) * (c.width / (rows + 8)),
          2,
          0,
          2 * Math.PI,
          false
        );
        ctx.strokeStyle = "#313232";
        ctx.fillStyle = "#313232"; //BackGround del circulo
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
  }, 100);
  return (
    <div className="HomeContainer">
      <Hero />
      <div className="CanvasContainerLayout">
        <canvas id="MyCanvasLinesLayout" width="300" height="300" />
      </div>
    </div>
  );
};
export default Home;
