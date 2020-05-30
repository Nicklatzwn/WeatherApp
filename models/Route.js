/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    var Route = sequelize.define('Route', {
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
        }
    });

    return Route;
};