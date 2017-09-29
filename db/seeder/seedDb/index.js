import {models} from '../../../server/models';
import importData from './importData';

export default () => {
  importData()
    .then(importedData => {
      return models.product.bulkCreate(importedData.products)
        .then(persistedProducts => {
          return models.inventory.bulkCreate(importedData.inventory);
        });
    })
}
