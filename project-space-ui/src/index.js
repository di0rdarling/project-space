import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import MyProjectsPageContainer from './components/projects/myProjectsPageContainer';
import ProjectPageContainer from './components/projects/projectPageContainer';

const routing = (
  <React.StrictMode>
    <Router>
      <Route path='/my-projects' component={MyProjectsPageContainer} />
      <Route path='/project/:id' component={ProjectPageContainer} />
    </Router>
  </React.StrictMode>
)


ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
