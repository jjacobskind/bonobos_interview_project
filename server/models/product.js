export default (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: {
      field: 'name',
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      field: 'description',
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      field: 'image',
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'products',
    timestamps: true,
    underscored: true,

    classMethods: {
      associate: function(models) {
        product.belongsToMany(models.style, { through: 'productStyleInventory', foreignKey: 'productId', otherKey: 'styleId' });
        product.hasMany(models.productStyleInventory, { foreignKey: 'productId' });
      }
    }
  });

  return product;
};
