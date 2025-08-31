import { sequelize } from '@/database/config/database';

import { Class } from './class.model';
import { Teacher } from './teacher.model';

Class.belongsTo(Teacher, { foreignKey: 'teacherId' });
Teacher.hasMany(Class, { foreignKey: 'teacherId' });

export { sequelize, Teacher, Class };
