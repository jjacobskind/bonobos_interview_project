export default (sequelize, DataTypes) => {
  const inventory = sequelize.define('inventory', {
    productId: {
      field: 'product_id',
      type: DataTypes.INTEGER,
      references: { model: 'products', key: 'id' },
      allowNull: false
    },
    style: {
      field: 'style',
      type: DataTypes.STRING,
      allowNull: false
    },
    waist: {
      field: 'waist',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    length: {
      field: 'length',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    count: {
      field: 'count',
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'inventories',
    timestamps: true,
    underscored: true
  });

  inventory.associate = function(models) {
    inventory.belongsTo(models.product, { foreignKey: 'productId' });
  }

  return inventory;
};
