import React from 'react';
import Helmet from 'react-helmet';
import ProductList from '../components/ProductList';
import Loader from '../components/Loader';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    fetch('/api/products?include=inventory')
      .then(response => {
        if(!response.ok) { throw response; }
        return response.json();
      })
      .then(responseBody => {
        this.setState({ products: responseBody.data, loaded: true })
      })
      .catch(response => {
        if(!response.ok) { /*TODO: handle this*/ }
      })
  }

  render() {
    const {loaded, products} = this.state;

    return (
      <div className='main-container'>
        <Helmet>
          <title>Store Inventory</title>
        </Helmet>
        <Loader hidden={loaded} message='Loading Inventory' />
        {loaded ? <ProductList products={products} /> : null }
      </div>
    );
  }
}
