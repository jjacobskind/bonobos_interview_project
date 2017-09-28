import path from 'path';
import Sequelize from 'sequelize';
import cls from 'continuation-local-storage';
Sequelize.cls = cls.createNamespace('transaction');


import {production as dbConfig} from '../../db/config/config.json';

let sequelizeInstance = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
import clsBluebird from 'cls-bluebird';
sequelizeInstance.Promise = require('bluebird').getNewLibraryCopy();
clsBluebird(Sequelize.cls, sequelizeInstance.Promise);

const models = [
  require('./product'),
  require('./productStyleInventory'),
  require('./style')
];

const _importModels = () => {
  models.forEach(model => {
    model(sequelizeInstance, Sequelize.DataTypes);
  });
};

const _associateModels = () => {
  for(let modelName in sequelizeInstance.models) {
    const model = sequelizeInstance.models[modelName];
    if ('associate' in model) {
      model.associate(sequelizeInstance.models);
    }
  }
};

_importModels();
_associateModels();

export default sequelizeInstance;
