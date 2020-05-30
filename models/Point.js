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
        reachedAt : {
            allowNull: false,
            type: DataTypes.DATE
        },
        status : {
            allowNull: false,
            type: DataTypes.INTEGER
        },

    });

    return Point;
};