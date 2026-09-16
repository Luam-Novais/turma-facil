import { db } from '../config/prisma';
import { TeacherDTO } from '../types/teacher';

export default class TeacherRepository {
  findById = async (teacher_id: number) => {
    return await db.teacher.findUnique({
      where: {
        id: teacher_id,
      },
      include: { class: true },
    });
  };
  get = async () => {
    return await db.teacher.findMany({
      include: { class: true },
    });
  };
  create = async (teacher: TeacherDTO) => {
    return await db.teacher.create({
      data: { ...teacher },
    });
  };
  update = async (teacher_id: number, data: Partial<TeacherDTO>) => {
    return await db.teacher.update({
      where: { id: teacher_id },
      data: {
        ...data,
      },
    });
  };
  delete = async (teacher_id: number) => {
    return await db.teacher.delete({
      where: {
        id: teacher_id,
      },
    });
  };
}
