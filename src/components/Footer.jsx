import React, { Fragment } from "react"
/* import Twitter from "../static/twitter.png" */
import Linkedin from "../static/linkedin.png"
import github from "../static/github.png"
import Instagram from "../static/instagram.png"
/*import Youtube from "../static/youtube.png"*/
import "../styles/components/Footer.css"
const Footer = () => {
  return (
    <Fragment>
      <footer>
        <div id="container-floating">
          {/* <div className="nd5 nds" data-toggle="tooltip" data-placement="left" data-original-title="Simone">
            <a href="">
              <img className="reminder" src={Facebook} alt="" />
            </a>
          </div> */}
          <div className="nd4 nds" data-toggle="tooltip" data-placement="left" data-original-title="contract@gmail.com">
            <a href="https://www.linkedin.com/in/cristian-florez-a291b3161/">
              <img className="reminder" src={Linkedin} alt="" />
            </a>
          </div>
          <div className="nd3 nds" data-toggle="tooltip" data-placement="left" data-original-title="Reminder">
            <a href="https://github.com/krisyupher/">
              <img className="reminder" src={github} alt="" />
            </a>
          </div>
          <div className="nd1 nds" data-toggle="tooltip" data-placement="left" data-original-title="Edoardo@live.it">
            <a href="https://www.instagram.com/krisyupher/">
              <img className="reminder" src={Instagram} alt="" />
            </a>
          </div>
          <div id="floating-button" data-toggle="tooltip" data-placement="left" data-original-title="Create">
            <p className="plus">+</p>
            <img className="edit" src={"https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png"} alt="" />
          </div>
        </div>

      </footer>
    </Fragment>
  )
}

export default Footer