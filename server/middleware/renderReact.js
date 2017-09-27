import React from 'react';
import Helmet from 'react-helmet';
import cloneDeep from 'lodash/cloneDeep';
import {renderToString} from 'react-dom/server';

// Renders react app to be inserted into ejs template

const _renderReact = (Component, req, res, next) => {
  const originalRender = res.render;
  res.render = (template, options={}, cb) => {

    const appState = cloneDeep(options);
    let renderProperties = { appState };
    renderProperties.html = renderToString(<Component {...appState} />);
    renderProperties.head = Helmet.rewind();
    originalRender.call(res, template, renderProperties, cb);
  }
  next();
}

export default (Component) => {
  return _renderReact.bind(null, Component);
}
