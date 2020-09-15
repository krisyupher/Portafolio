import React, { Fragment } from "react"
import Work from "../components/Work"
import BookMePoster from "../static/BookMe.png"
import Portafolio from "../static/Portafolio.png"
import "../styles/containers/Works.css"
const Works = () => {
  return (
    <Fragment>
      <div className="Works">
        <h2>WORKS</h2>
        <div className="cards">
          <Work
            title="BookMe"
            poster={BookMePoster}
            funcionamiento="Booking. Entras, escoges una pelicula, tu cine mas cercano, el asiento de preferencia y te generamos un ticket. Cuando llegues al cines lo pagas."
            description="Proyecto reaclizado con React, React-router, carrucel funcional con Whirligig y consumiendo APIs con async await"
            link="https://github.com/krisyupher/BookMe-platzi/tree/Cristian"
          />
          <Work
            title="Portafolio"
            poster={Portafolio}
            funcionamiento="Estas en él. Con cuatro vistas: home, works, skills, contacto. Estare actualizandola periodicamente. cualquier FeedBack es bienvenido y si me quieres ayudar mas que genial"
            description="Proyecto reaclizado con React, React-router, jsx, css3"
            link="https://github.com/krisyupher/"
          />
        </div>
      </div>
    </Fragment>
  )
}
export default Works