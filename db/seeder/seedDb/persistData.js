import sequelize from '../../../server/models';
const {models} = sequelize;

export const persistStyles = (inventoryData) => {
  let uniqueStyles = new Set([]);
  inventoryData.forEach(record => {
    uniqueStyles.add(record.style);
  });

  const styleNames = Array.from(uniqueStyles);
  const styleObjects = styleNames.map(style => ({ name: style }));
  return models.style.bulkCreate(styleObjects)
  .then(() => {
    return models.style.findAll({ where: { name: { $in: styleNames } } });
  });
}

export const persistStyleProductInventories = (inventoryData, persistedStyles) => {
  let styleIdMap = {};
  persistedStyles.forEach(style => {
    styleIdMap[style.name] = style.id;
  });

  const inventoryObjects = inventoryData.map(item => {
    item.styleId = styleIdMap[item.style];
    return item;
  });

  return models.productStyleInventory.bulkCreate(inventoryObjects);
}
