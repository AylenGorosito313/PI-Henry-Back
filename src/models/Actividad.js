const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Actividad', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad: {
        type: DataTypes.INTEGER,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temporada: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },

  
    {
      timestamps:false,
    }
  
  );
};