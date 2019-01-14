module.exports = (sequelize, Sequelize) => {
    const Meeting = sequelize.define('meetings', {
        nome: {
            type: Sequelize.STRING
        },
        nomeIntegrante1: {
            type: Sequelize.STRING
        },
        nomeIntegrante2: {
            type: Sequelize.STRING
        },
        nomeIntegrante3: {
            type: Sequelize.STRING
        },
        nomeIntegrante4: {
            type: Sequelize.STRING
        }
    });

    return Meeting;
}