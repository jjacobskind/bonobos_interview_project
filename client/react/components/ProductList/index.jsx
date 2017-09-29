import React from 'react';
import ProductTile from './ProductTile';

export default (props) => {
  const {products} = props;

  const productTiles = products.map((product, index) => {
    return <ProductTile key={index} product={product} />;
  });

  return (
    <ul className='ProductList'>
      {productTiles}
    </ul>
  );
}
