export default (sequelize, DataTypes) => {
  const productStyleInventory = sequelize.define('productStyleInventory', {
    stockCount: {
      field: 'stock_count',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    productId: {
      field: 'product_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'products', key: 'id' }
    },
    styleId: {
      field: 'style_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'styles', key: 'id' }
    },
    height: {
      field: 'height',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    waist: {
      field: 'waist',
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'product_style_inventories',
    timestamps: true,
    underscored: true,

    classMethods: {
      associate: function(models) {
        productStyleInventory.belongsTo(models.product, { foreignKey: 'productId' });
        productStyleInventory.belongsTo(models.style, { foreignKey: 'styleId' });
      }
    }
  });

  return productStyleInventory;
};
