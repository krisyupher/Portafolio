import React, { Fragment } from "react"
import { NavLink } from "react-router-dom"
import "../styles/components/Header.scss"
const Header = () => {
  return (
    <Fragment>
      <div className="Header">
        <ul>
          <li>
            <NavLink exact to="/countriesflag" activeClassName="is-selected">
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