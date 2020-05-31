/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Routertrip = sequelize.define('Routertrip', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        temperature: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        humidity : {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        UserId: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        }
    });

    Routertrip.associate = function(models) {
        // Routertrip belongsTo User
        Routertrip.belongsTo(models.User, { foreignKey: 'UserId' });
        // Routertrip has many Point
        Routertrip.hasMany(models.Point,  { onDelete: 'CASCADE' , hooks: true});
    }

    return Routertrip;
};