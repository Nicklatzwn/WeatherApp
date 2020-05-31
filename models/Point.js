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
            allowNull: true,
            type: DataTypes.TIME
        },
        reachedAt : {
            allowNull: false,
            type: DataTypes.DATE
        },
        status : {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        RoutertripId: {
            allowNull: true,
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