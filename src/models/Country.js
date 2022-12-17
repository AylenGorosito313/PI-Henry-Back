const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Countries', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    poblacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flags: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    
  
  },
  {
    timestamps:false,
  }
  
  );
};
