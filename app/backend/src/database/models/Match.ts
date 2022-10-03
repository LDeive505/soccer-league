import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamScore!: number;
  awayTeam!: number;
  awayTeamScore!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamName' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamName' });
Team.hasMany(Match, { foreignKey: 'teamName', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'teamName', as: 'awayTeam' });

export default Match;
