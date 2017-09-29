import path from 'path';
import csvtojson from 'csvtojson';
import Promise from 'bluebird';
const autoInjectAsync = Promise.promisify(require('async').autoInject);

const filePath = path.join(path.resolve(), 'db/seeder/dataFiles');

const _readDataFile = (filePath) => {
  return new Promise((resolve, reject) => {
    let entities = [];
    csvtojson()
      .fromFile(filePath)
      .on('json', (jsonObj) => {
        entities.push(jsonObj);
      })
      .on('done',(err) => {
        if(err) { return reject(err); }
        resolve(entities);
      })
  });
}

const _importData = () => {
    return autoInjectAsync({
      products: asyncNext => {
        _readDataFile(path.join(filePath, 'products.csv'))
          .then(productData => {
            productData = productData.map(record => {
              return {
                id: parseInt(record.product_id),
                name: record.product_name.trim(),
                image: record.product_image.trim(),
                description: record.product_description.trim()
              }
            })
            asyncNext(null, productData);
          })
          .catch(asyncNext);
      },

      inventory: asyncNext => {
        _readDataFile(path.join(filePath, 'inventory.csv'))
          .then(inventoryData => {
            inventoryData = inventoryData.map(record => {
              return {
                productId: parseInt(record.product_id),
                waist: parseInt(record.waist),
                length: parseInt(record.length),
                count: parseInt(record.count),
                style: record.style.trim()
              }
            })
            asyncNext(null, inventoryData);
          })
          .catch(asyncNext);
      }
    });

}

export default _importData;
