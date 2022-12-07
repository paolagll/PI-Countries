const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  
// x  ID (Código de 3 letras) *
// x Nombre *
// x Imagen de la bandera *
// x Continente *
// x Capital *
// x Subregión
// x Área
// Población

  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: true
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING,
      allowNull: true
    },
    area:{
      type: DataTypes.STRING,
      allowNull: false
    },
    population:{
      type: DataTypes.STRING,
      allowNull: true
    },
  });
};
