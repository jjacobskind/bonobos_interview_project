import sequelize from '../../../server/models';
const {models} = sequelize;
import importData from './importData';
import {persistStyles, persistStyleProductInventories} from './persistData';

export default () => {
  importData()
    .then(importedData => {
      return models.product.bulkCreate(importedData.products)
        .then(persistedProducts => {
          return persistStyles(importedData.inventory);
        })
        .then(persistedStyles => {
          return persistStyleProductInventories(importedData.inventory, persistedStyles);
        });
    })
}
