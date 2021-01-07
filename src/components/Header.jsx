import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import "../styles/components/Header.scss"
const Header = () => {
  setTimeout(() => {
    var c = document.getElementById("MyCanvasLinesHeader");
    var ctx = c.getContext("2d");
    for (let i = 0; i < 20; i++) {
      ctx.moveTo(i * 30, 0);
      ctx.lineTo(0, i * 30);
      ctx.strokeStyle = "#a0a4a4";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }, 100);
  return (
    <Fragment>
      <div className="Header">
        <div className="CanvasContainer">
          <canvas id="MyCanvasLinesHeader" />
        </div>
        <div className="NameAndJob">
          <h2>
            CRISTIAN FLOREZ
          </h2>
        </div>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="is-selected">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/works" activeClassName="is-selected">
              WORKS
            </NavLink>
          </li>
           <li>
            <NavLink to="/skills" activeClassName="is-selected">
              SKILLS
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/contact" activeClassName="is-selected">
              CONTACT
            </NavLink>
          </li> */}
        </ul>
      </div>
    </Fragment>
  )

}
export default Header