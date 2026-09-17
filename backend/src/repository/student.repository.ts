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
  getStudentAndEnrollments = async (student_id: number) => {
    return await db.student.findUnique({
      where: { id: student_id },
      include: { enrollments: true },
    });
  };
  getStudentAndPayments = async (student_id: number) => {};
  getBySearch = async (searchName: string) => {
    return await db.student.findMany({
      where: { name: { contains: searchName, mode: 'insensitive' } },
    });   
  };
  get = async () => {
    return await db.student.findMany();
  };
  getChildrenStudent = async () => {
    return await db.student.findMany({
      where: {
        name_responsible: { not: null },
      },
    });
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
