'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Points', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            coordinate_x: {
                allowNull: false,
                type: Sequelize.STRING
            },
            coordinate_y: {
                allowNull: false,
                type: Sequelize.STRING
            },
            reachedAt : {
                allowNull: false,
                type: Sequelize.DATE
            },
            clockAt : {
                allowNull: false,
                type: Sequelize.TIME
            },
            icon: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            temperature: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            humidity: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            status : {
                allowNull: false,
                type: Sequelize.STRING
            },
            RoutertripId: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                onDelete: 'CASCADE',
                references: { model: 'Routertrips', key: 'id' }
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Points');
    }
};