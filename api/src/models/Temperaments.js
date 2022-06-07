const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'Temperament',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      nombre: { type: DataTypes.STRING, unique: true },
    },
    {
      timestamps: false,
    }
  );
};
