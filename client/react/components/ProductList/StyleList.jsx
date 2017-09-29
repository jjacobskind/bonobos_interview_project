import React from 'react';


export default (props) => {
  const {inventories} = props;

  let header = [
    <div><strong>{inventories[0].style}</strong></div>,
    <div className='col-container header'>
      <div className='col'>Waist</div>
      <div className='col'>Length</div>
      <div className='col'>Count</div>
    </div>
  ];

  const list = inventories.map(inv => (
    <li className='col-container'>
      <div className='col'>{inv.waist}</div>
      <div className='col'>{inv.length}</div>
      <div className='col'>{inv.count}</div>
    </li>
  ));


  return (
    <div className='StyleList'>
      {header}
      <ul>
        {list}
      </ul>

    </div>
  );
}
