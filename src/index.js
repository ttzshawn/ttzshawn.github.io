import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import CanvasPanel from './components/home/canvasPanel.jsx';
import Full from './components/full/Full.jsx'

render((
  <Router history={hashHistory}>
    <Route path="/" component={CanvasPanel} />
    <Route path="/full" component={Full} />
  </Router>
), document.getElementById('main'));