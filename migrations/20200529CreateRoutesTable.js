'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Routes', {
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
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            temperature: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            humidity : {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Routes');
    }
};