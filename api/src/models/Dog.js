const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define(
    'Dog',
    {
      idDog: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Altura: { type: DataTypes.INTEGER, allowNull: false },
      Peso: { type: DataTypes.INTEGER, allowNull: false },
      Anios_de_vida: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
};
