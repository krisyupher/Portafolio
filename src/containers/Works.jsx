import React, { Fragment } from "react"
import Work from "../components/Work"
import BookMePoster from "../static/BookMe.png"
import ticTacToe from "../static/tres-en-raya-reglas.jpg"
import Portafolio from "../static/Portafolio.png"
import Countrys from "../static/Countrys.png"
import "../styles/containers/Works.scss"
const Works = () => {
  return (
    <Fragment>
      <div className="Works">
        <div className="cards">
          <Work
            title="BookMe"
            poster={BookMePoster}
            description="Proyecto reaclizado con React, React-router, carrucel funcional con Whirligig y consumiendo APIs con async await"
            link="https://github.com/krisyupher/BookMe-platzi/tree/Cristian"
          />
          <Work
            title="Where in the world?"
            poster={Countrys}
            description="Proyecto reaclizado con React, React-router, carrucel funcional con Whirligig y consumiendo APIs con async await"
            link="https://krisyupher.github.io/countriesflag/"
          />
          <Work
            title="tic-tac-toe"
            poster={ticTacToe}
            description="React.js, and css. First attempt at PWA (Progressive Web App) download it from your android."
            link="https://krisyupher.github.io/tres-en-linea/"
          />
        </div>
      </div>
    </Fragment>
  )
}
export default Works