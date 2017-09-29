import express from 'express';
const router = express.Router();

import {models} from '../../models';


router.get('/products', (req, res, next) => {
  let productQuery = { order: [['name', 'ASC']] };

  const include = (req.query.include || '').split(',').map(val =>(val.trim().toLowerCase()));

  if(include.indexOf('inventory') > -1) {
    productQuery.include = [models.inventory];
  }

  models.product.findAll(productQuery)
    .then(productData => {
      res.json({ data: productData });
    })
})

export default router;
