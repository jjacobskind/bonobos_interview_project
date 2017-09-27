import React from 'react';
import Helmet from 'react-helmet';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Store Inventory</title>
        </Helmet>
        <h1>App Container</h1>
      </div>
    );
  }
}
