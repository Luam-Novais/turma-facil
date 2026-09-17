import e from 'express';
import { db } from '../config/prisma';
import { EnrollmentDTO, EnrollmentAndSudentDTO } from '../types/enrollments';

export class EnrollmentsRepository {
  get = async () => {
    const [students, total] = await Promise.all([
      db.enrollment.findMany({
        include: { class: true, student: true },
      }),
      db.enrollment.count(),
    ]);
    return { students, total };
  };
  getAllStudentEnrollments = async (id: number) => {
    return await db.enrollment.findMany({ where: { student_id: id }, include: { class: true } });
  };
  getAllEnrollmentsClass = async (id: number) => {
    return await db.enrollment.findMany({ where: { class_id: id }, include: { student: true } });
  };
  getEnrollmentsByStatus = async (status: boolean) => {
    const [enrollments, total] = await Promise.all([
      await db.enrollment.findMany({
        where: {
          status,
        },
        include: { class: true, student: true },
      }),
      await db.enrollment.count({
        where: { status },
      }),
    ]);
    return {enrollments, total}
  };
  createStudentAndEnrollments = async (data: EnrollmentAndSudentDTO) => {
    return await db.$transaction(async (tx) => {
      const student = await tx.student.create({
        data: { ...data.student_data },
      });

      await tx.enrollment.create({
        data: {
          start_date: new Date(data.start_date),
          class_id: +data.class_id,
          status: true,
          student_id: student.id,
        },
      });
    });
  };
  createEnrollmentsForExistingStudent = async (data: EnrollmentDTO) => {
    return await db.$transaction(async (tx) => {
      await tx.student.findFirstOrThrow({ where: { id: +data.student_id } });
      await tx.classGroup.findFirstOrThrow({ where: { id: +data.class_id } });

      await tx.enrollment.create({ data: { ...data, start_date: new Date(data.start_date) } });
    });
  };
  updateStatusEnrollment = async (id: number, status: boolean) => {
    return db.enrollment.update({
      where: { id: id },
      data: {
        status: status,
      },
    });
  };
  delete = async (id: number) => {
    return db.enrollment.delete({ where: { id: id } });
  };
}
