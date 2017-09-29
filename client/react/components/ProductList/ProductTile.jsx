import React from 'react';
import StyleList from './StyleList';

const _styleLists = (inventories) => {
  let styleMap = {};
  inventories.forEach(inventory => {
    styleMap[inventory.style] = styleMap[inventory.style] || [];
    styleMap[inventory.style].push(inventory);
  });

  const styleLists = Object.keys(styleMap)
                      .sort()
                      .map((key, index) => {
                        return <StyleList key={index} inventories={styleMap[key]} />
                      });
  return styleLists;
}

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
        {_styleLists(product.inventories)}
      </div>
    </li>
  );
}
