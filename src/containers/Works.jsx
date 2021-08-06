import React, { Fragment } from "react";
import WorkPoster from "../components/WorkPoster";
import BookMePoster from "../static/BookMe.png";
import ticTacToe from "../static/tres-en-raya-reglas.jpg";
import MovieSearcherTMDB from "../static/Movie-Searcher-TMDB.png";
import Countrys from "../static/Countrys.png";
import TuAp from "../static/TuAp.png";
import ExpressTest from "../static/expressTest.png";
import titaMedia from "../static/titaMedia.png";
import troop from "../static/troop.png";
import "../styles/containers/Works.scss";
const Works = () => {
  return (
    <Fragment>
      <div className="Works">
        <div className="cards">
          <WorkPoster
            title="troop.com.co"
            poster={troop}
            description="Current job, collaborator with Angular technology."
            linkView="https://www.troop.com.co/#/"
            date="AGO 2021"
            Link="https://www.linkedin.com/company/quantum-connexion"
          />
          <WorkPoster
            title="tita-media-challenge"
            poster={titaMedia}
            description="Enough of React and Angular. This project is with css, js and html. Only that. We make requests to a service, grids and styles like pinterest."
            linkView="https://tita-media-challenge.herokuapp.com/"
            date="AGO 2021"
            Link="https://github.com/krisyupher/TitaMedia-Challenge"
          />
          <WorkPoster
            title="Node-Espress Test"
            poster={ExpressTest}
            description="Starting in the back world, test project implementing architecture and get, put, post and delete requests. finally published on heroku."
            linkView="https://express-test-krisyupher.herokuapp.com/"
            date="JUL 2021"
            Link="https://github.com/krisyupher/express-test"
          />
          <WorkPoster
            title="TuAp.com"
            poster={TuAp}
            description="web and mobile project - Angular and Ionic - eCommerce for stores - Running right now"
            linkView="https://TuAp.com"
            date="Mar 2021"
            Link="https://www.linkedin.com/company/quantum-connexion"
          />
          <WorkPoster
            title="Movie Searcher TMDB"
            poster={MovieSearcherTMDB}
            description="IMDB is a repository of information about movies and series that also provides
            consultation services for fans of the subject."
            linkView="https://krisyupher.github.io/Movie-Searcher-TMDB/"
            date="Dec 2020"
            Link="https://github.com/krisyupher/Movie-Searcher-TMDB"
          />
          <WorkPoster
            title="tic-tac-toe"
            poster={ticTacToe}
            description="React.js, and css. First attempt at PWA (Progressive Web App) download it from your android."
            linkView="https://krisyupher.github.io/tres-en-linea/"
            date="Nov 2020"
            Link="https://github.com/krisyupher/tres-en-linea"
          />
          <WorkPoster
            title="Where in the world?"
            poster={Countrys}
            description="Proyecto reaclizado con React, React-router, carrucel funcional con Whirligig y consumiendo APIs con async await"
            linkView="https://krisyupher.github.io/countriesflag/"
            date="Jul 2020"
            Link="https://github.com/krisyupher/countriesflag"
          />
          <WorkPoster
            title="BookMe"
            poster={BookMePoster}
            description="Proyecto reaclizado con React, React-router, carrucel funcional con Whirligig y consumiendo APIs con async await"
            linkView="https://krisyupher.github.io/BookMe-platzi/"
            date="2019"
            Link="https://github.com/krisyupher/BookMe-platzi"
          />
        </div>
      </div>
    </Fragment>
  );
};
export default Works;
