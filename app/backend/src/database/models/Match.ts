import { INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
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
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Match;
