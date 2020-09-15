import React, { Fragment } from "react"
import "../styles/containers/Contact.css"
const Contact = () => {
  return (
    <Fragment>
      <div className="Contact">
        <h2>CONTACT</h2>
        <form className="Contact-form" action="getform.php" method="get">
          <input className="Contact-title" type="text" placeholder="Title" name="title"/>
          <input className="Contact-nickname" type="text" placeholder="Email, Twitter, Facebook, etc." name="nickname"/>
          <textarea className="Contact-TextArea" placeholder="Proximamente..." name="textArea"/>
          <input className="Boton-Enviar" type="submit" value="Sorry" name="submit"/>
        </form>
      </div>
    </Fragment>
  )
}
export default Contact
