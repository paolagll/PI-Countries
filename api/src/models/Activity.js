const { DataTypes } = require('sequelize');

// x ID
// x Nombre
// x Dificultad (Entre 1 y 5)
// x Duración
// x Temporada (Verano, Otoño, Invierno o Primavera)

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        // id:{
        //     type: DataTypes.UUID,
        //     allownull: false,
        //     primaryKey: true
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min:1,
                max:5,
            }
         },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min:1,
                max:24,
            }
        },
        season:{
            type: DataTypes.STRING,
            validate:{
                isIn : [['summer', 'winter','autumm','spring']]
            },
            allowNull: false
        }
    },
    {
     timestamps: false,
    });
};
