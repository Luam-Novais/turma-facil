import { db } from '../config/prisma';
import { type StudentDTO } from '../types/student';
export default class StudentRepository {
  findById = async (student_id: number) => {
    return await db.student.findUnique({
      where: {
        id: student_id,
      },
    });
  };
  get = async () => {
    return await db.student.findMany();
  };
  create = async (student: StudentDTO) => {
    return await db.student.create({
      data: { ...student },
    });
  };
  update = async (student_id: number, data: Partial<StudentDTO>) => {
    return await db.student.update({
      where: { id: student_id },
      data: {
        ...data,
      },
    });
  };
  delete = async (student_id: number) => {
    return await db.student.delete({
      where: {
        id: student_id,
      },
    });
  };
}
