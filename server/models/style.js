export default (sequelize, DataTypes) => {
  const style = sequelize.define('style', {
    name: {
      field: 'name',
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'styles',
    timestamps: true,
    underscored: true
  });

  style.associate = function(models) {
    style.belongsToMany(models.product, { through: 'productStyleInventory', foreignKey: 'styleId', otherKey: 'productId' });
    style.hasMany(models.productStyleInventory, { foreignKey: 'styleId' });
  }

  return style;
};
