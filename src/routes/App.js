import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';
import Layout from '../containers/Layout';
import Works from "../containers/Works"
import Skills from "../containers/Skills"
import Contact from "../containers/Contact"
const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Portafolio" component={Home} />
        <Route exact path="/works" component={Works} />
        <Route exact path="/skills" component={Skills}/>
        <Route exact path="/contact" component={Contact}/>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
)

export default App;