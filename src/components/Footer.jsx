import React, { Fragment } from "react"
import Twitter from "../static/twitter.png"
import Linkedin from "../static/linkedin.png"
import Instagram from "../static/instagram.png"
/*import Youtube from "../static/youtube.png"*/
import Facebook from "../static/facebook.png"
import "../styles/components/Footer.css"
const Footer = () => {
  return (
    <Fragment>
      <footer>
        <div id="container-floating">

          <div className="nd5 nds" data-toggle="tooltip" data-placement="left" data-original-title="Simone">
            <img className="reminder" src={Facebook} alt=""/>
          </div>
          <div className="nd4 nds" data-toggle="tooltip" data-placement="left" data-original-title="contract@gmail.com">
            <img className="reminder" src={Linkedin}  alt=""/>
          </div>
          <div className="nd3 nds" data-toggle="tooltip" data-placement="left" data-original-title="Reminder">
            <img className="reminder" src={Twitter}  alt=""/>
          </div>
          <div className="nd1 nds" data-toggle="tooltip" data-placement="left" data-original-title="Edoardo@live.it">
            <img className="reminder" src={Instagram}  alt=""/>
          </div>

        <div id="floating-button" data-toggle="tooltip" data-placement="left" data-original-title="Create">
            <p className="plus">+</p>
            <img className="edit" src={"https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png"}  alt=""/>
          </div>
        </div>

      </footer>
    </Fragment>
  )
}

export default Footer