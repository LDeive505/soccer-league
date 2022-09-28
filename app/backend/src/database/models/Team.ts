import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default Team;
