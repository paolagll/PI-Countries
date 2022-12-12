const { DataTypes } = require('sequelize');

// x ID
// x Nombre
// x Dificultad (Entre 1 y 5)
// x Duración
// x Temporada (Verano, Otoño, Invierno o Primavera)

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        id:{
            type: DataTypes.UUID,
            allownull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        difficulty: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: false,
         },
        duration:{
            type: DataTypes.TIME,
            allowNull: false
        },
        season:{
            type: DataTypes.ENUM('summer', 'winter','autumm','spring'),
            allowNull: false
        }
    },
    {
     timestamps: false,
    });
};
