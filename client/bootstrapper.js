import React from 'react';
import {render} from 'react-dom';
import App from './react/containers/App';

const reactContainer = document.getElementById('react-container');

if (process.env.BROWSER) {
  require('./styles/_Base.scss');
}

render(<App {...window.__APP_STATE__}/>,
  reactContainer
);
