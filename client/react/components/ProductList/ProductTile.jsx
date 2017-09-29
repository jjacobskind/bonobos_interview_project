import React from 'react';

export default (props) => {
  const {product} = props;

  return (
    <li className='ProductTile'>
      <div className='product-col'>
        <div>
          <img src={product.image} />
          <h2>{product.name}</h2>
          <strong>{product.description}</strong>

        </div>
      </div>

      <div className='inventory-col'>

      </div>
    </li>
  );
}
