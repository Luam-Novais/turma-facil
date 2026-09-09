import { db } from '../config/prisma';
import { TeacherDTO } from '../types/teacher';

export default class TeacherRepository {
  findById = async (teacher_id: number) => {
    return await db.teacher.findUnique({
      where: {
        id: teacher_id,
      },
    });
  };
  get = async () => {
    return await db.teacher.findMany();
  };
  create = async (teacher: TeacherDTO) => {
    return await db.teacher.create({
      data: { ...teacher },
    });
  };
  update = async (teacher_id: number, data: Partial<TeacherDTO>) => {
    try {
      return await db.teacher.update({
        where: { id: teacher_id },
        data: {
          ...data,
        },
      });
    } catch (error: any) {
      throw error;
    }
  };
  delete = async (teacher_id: number)=>{
    try {
         return await db.teacher.delete({
           where: {
             id: teacher_id,
           },
         });
    } catch (error) {
      throw error
    }
  }
}
