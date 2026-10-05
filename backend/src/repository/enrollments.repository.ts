import { db } from '../config/prisma';
import { EnrollmentDTO, EnrollmentAndSudentDTO, StatusEnrollment } from '../types/enrollments';
import { MonthlyFeeDTO } from '../types/monthlyFee';
import { MonthlyFeeService } from '../services/monthlyFee.services';
import { MonthlyFeeRepository } from './monthlyFee.repository';

const monthlyFeRepository = new MonthlyFeeRepository();
const monthlyFeeService = new MonthlyFeeService(monthlyFeRepository);

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
    return await db.enrollment.findMany({
      where: { student_id: id },
      include: {
        class: {
          omit: { id: true },
        },
        student: {
          select: {
            name: true,
            contact_number: true,
          },
        },
      },
    });
  };
  getAllEnrollmentsClass = async (id: number) => {
    return await db.enrollment.findMany({ where: { class_id: id }, include: { student: true } });
  };
  getEnrollmentsByStatus = async (status: StatusEnrollment) => {
    const [enrollments, total] = await Promise.all([
      await db.enrollment.findMany({
        where: {
          status: status,
        },
        include: { class: true, student: true },
      }),
      await db.enrollment.count({
        where: { status },
      }),
    ]);
    return { enrollments, total };
  };
  createStudentAndEnrollments = async (data: EnrollmentAndSudentDTO, monthlyFeeService: MonthlyFeeService) => {
    console.log('ooooiiiiii')
    return await db.$transaction(async (tx) => {
      const student = await tx.student.create({
        data: { ...data.student_data },
      });
      const findedClass = await tx.classGroup.findFirstOrThrow({ where: { id: data.class_id } });

      const enrollment = await tx.enrollment.create({
        data: {
          start_date: new Date(data.start_date),
          class_id: +data.class_id,
          status: 'ACTIVE',
          student_id: student.id,
        },
      });
       console.log(monthlyFeeService.formatToEnrollmentCreation(findedClass));
      
      // await tx.monthly_fee.create({
      //   data: {
      //     enrollment_id: enrollment.id,
      //     ...monthlyFeeService.formatToEnrollmentCreation(findedClass),
      //   },
      // });
    });
  };
  createEnrollmentsForExistingStudent = async (data: EnrollmentDTO, monthlyFeeService: MonthlyFeeService) => {
    return await db.$transaction(async (tx) => {
      await tx.student.findFirstOrThrow({ where: { id: +data.student_id } });
      const classGroup = await tx.classGroup.findFirstOrThrow({ where: { id: +data.class_id } });

      const enrollment = await tx.enrollment.create({ data: { ...data, status: 'ACTIVE', start_date: new Date(data.start_date) } });
      const monthly_feeData = monthlyFeeService.formatToEnrollmentCreation(classGroup)
      await tx.monthly_fee.create({
        data: {
          value: monthly_feeData.value,
          expiration_date: monthly_feeData.expiration_date,
          enrollment_id: enrollment.id
        }
      })

    });
  };
  updateStatusEnrollment = async (id: number, status: StatusEnrollment) => {
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
//  return await db.$transaction(async (tx) => {
//    const classGroup = await tx.classGroup.findFirstOrThrow({ where: { id: data.class_id } });
//    const student = await tx.student.create({
//      data: { ...data.student_data },
//    });

//    const enrollment = await tx.enrollment.create({
//      data: {
//        start_date: new Date(data.start_date),
//        class_id: +data.class_id,
//        status: 'ACTIVE',
//        student_id: student.id,
//      },
//    });
//    await tx.monthly_fee.create({
//      data: {
//        enrollment_id: enrollment.id,
//        value: monthlyFeeService.calculateValueMonthlyFee(classGroup),
//        expiration_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15),
//      },
//    });
//  });
