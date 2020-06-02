/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Point = sequelize.define('Point', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        coordinate_x: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        coordinate_y: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        clockAt : {
            allowNull: false,
            type: DataTypes.TIME
        },
        reachedAt : {
            allowNull: false,
            type: DataTypes.DATE
        },
        icon: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        temperature: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        humidity: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        status : {
            allowNull: false,
            type: DataTypes.STRING
        },
        RoutertripId: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },

    });

    Point.associate = function(models) {
        // Route belongsTo User
        Point.belongsTo(models.Routertrip, { foreignKey: 'RoutertripId', onDelete: 'CASCADE' });
    };

    return Point;
};