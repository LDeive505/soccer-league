module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      home_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpddaate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'teams', key: 'id' },
        foreignKey: true,
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      away_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpddaate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'teams', key: 'id' },
        foreignKey: true,
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      in_progress: {
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};
