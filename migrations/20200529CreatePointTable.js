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
            routerId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Points');
    }
};