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
    underscored: true
  });

  product.associate = function(models) {
    product.hasMany(models.inventory, { foreignKey: 'productId' });
  }

  return product;
};
