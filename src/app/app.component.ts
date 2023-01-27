import { Component } from '@angular/core';
import { Work } from './work.model';
import { WorkCardComponent } from './work-card/work-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  title = 'Portafolio';
  works: Work[] = [
    {
      title: 'Corte Suprema de Justicia',
      poster: '../assets/img/CorteSuprema.png',
      description: 'Current job, collaborator with Angular technology.',
      linkView: 'https://cortesuprema.gov.co/corte/',
      date: 'ENE 2023',
      Link: 'https://www.linkedin.com/company/corte-suprema-de-justicia/',
    },
    {
      title: 'Supremo Buscador',
      poster: '../assets/img/SupremoBuscador.png',
      description: 'Current job, collaborator with Angular technology.',
      linkView: 'http://consultaprovidencias.cortesuprema.gov.co/busqueda',
      date: 'SEP 2022',
      Link: 'https://www.linkedin.com/company/corte-suprema-de-justicia/',
    },
    {
      title: 'ESAV',
      poster: '../assets/img/Esav.png',
      description: 'Current job, collaborator with Angular technology.',
      linkView: 'https://ecosistemadigital.cortesuprema.gov.co/#/',
      date: 'AGO 2022',
      Link: 'https://www.linkedin.com/company/corte-suprema-de-justicia/',
    },
    {
      title: 'Davivienda',
      poster: '../assets/img/Davivienda.png',
      description: 'Current job, collaborator with Angular technology.',
      linkView: 'https://www.davivienda.com/wps/portal/personas/nuevo',
      date: 'MAY 2022',
      Link: 'https://www.linkedin.com/company/seti-colombia/',
    },
    {
      title: 'troop.com.co',
      poster: '../assets/img/troop.png',
      description: 'Current job, collaborator with Angular technology.',
      linkView: 'https://www.troop.com.co/#/',
      date: 'AGO 2021',
      Link: 'https://www.linkedin.com/company/quantum-connexion',
    },
    {
      title: 'tita-media-challenge',
      poster: '../assets/img/titaMedia.png',
      description:
        'Enough of React and Angular. This project is with css, js and html. Only that. We make requests to a service, grids and styles like pinterest.',
      linkView: 'https://tita-media-challenge.herokuapp.com/',
      date: 'AGO 2021',
      Link: 'https://github.com/krisyupher/TitaMedia-Challenge',
    },
    {
      title: 'Node-Espress Test',
      poster: '../assets/img/expressTest.png',
      description:
        'Starting in the back world, test project implementing architecture and get, put, post and delete requests. finally published on heroku.',
      linkView: 'https://express-test-krisyupher.herokuapp.com/',
      date: 'JUL 2021',
      Link: 'https://github.com/krisyupher/express-test',
    },
    {
      title: 'TuAp.com',
      poster: '../assets/img/TuAp.png',
      description:
        'web and mobile project - Angular and Ionic - eCommerce for stores - Running right now',
      linkView: 'https://TuAp.com',
      date: 'Mar 2021',
      Link: 'https://www.linkedin.com/company/quantum-connexion',
    },
    {
      title: 'Movie Searcher TMDB',
      poster: '../assets/img/Movie-Searcher-TMDB.png',
      description:
        'IMDB is a repository of information about movies and series that also provides consultation services for fans of the subject.',
      linkView: 'https://krisyupher.github.io/Movie-Searcher-TMDB/',
      date: 'Dec 2020',
      Link: 'https://github.com/krisyupher/Movie-Searcher-TMDB',
    },
    {
      title: 'tic-tac-toe',
      poster: '../assets/img/tres-en-raya-reglas.jpg',
      description:
        'React.js, and css. First attempt at PWA (Progressive Web App) download it from your android.',
      linkView: 'https://krisyupher.github.io/tres-en-linea/',
      date: 'Nov 2020',
      Link: 'https://github.com/krisyupher/tres-en-linea',
    },
    {
      title: 'Where in the world?',
      poster: '../assets/img/Countrys.png',
      description:
        'Proyecto reaclizado con React, React-router, carrucel funcional con Whirligig y consumiendo APIs con async await',
      linkView: 'https://krisyupher.github.io/countriesflag/',
      date: 'Jul 2020',
      Link: 'https://github.com/krisyupher/countriesflag',
    },
    {
      title: 'BookMe',
      poster: '../assets/img/BookMe.png',
      description:
        'Proyecto reaclizado con React, React-router, carrucel funcional con Whirligig y consumiendo APIs con async await',
      linkView: 'https://krisyupher.github.io/BookMe-platzi/',
      date: '2019',
      Link: 'https://github.com/krisyupher/BookMe-platzi',
    },
  ];
}
