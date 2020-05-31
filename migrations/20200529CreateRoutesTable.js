'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Routertrips', {
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
            UserId: {
                allowNull: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                references: { model: 'Users', key: 'id' }
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Routertrips');
    }
};