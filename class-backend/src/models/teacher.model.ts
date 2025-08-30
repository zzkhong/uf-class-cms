import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../config/database';

interface TeacherAttributes {
  id: number;
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}

interface TeacherCreationAttributes extends Optional<TeacherAttributes, 'id'> {}

export class TeacherModel
  extends Model<TeacherAttributes, TeacherCreationAttributes>
  implements TeacherAttributes
{
  public id!: number;
  public name!: string;
  public subject!: string;
  public email!: string;
  public contactNumber!: string;
}

TeacherModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'teachers',
    timestamps: true,
    indexes: [{ unique: true, fields: ['email'] }],
  },
);
