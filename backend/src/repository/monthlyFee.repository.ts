import { db } from '../config/prisma';
import { MonthlyFeeDTO, MonthlyFeeStatus } from '../types/monthlyFee';
export class MonthlyFeeRepository {
  //GET
  get = async () => {
    return await db.monthly_fee.findMany({
      include: {
        enrollment: {
          include: {
            student: {
              select: { name: true, contact_number: true },
            },
            class: { select: { name: true } },
          },
        },
      },
    });
  };
  getById = async (id: number) =>
    await db.monthly_fee.findUnique({
      where: { id },
      include: {
        enrollment: {
          include: {
            student: {
              select: { name: true, contact_number: true },
            },
            class: { select: { name: true } },
          },
        },
      },
    });
  getByStatus = async (status: MonthlyFeeStatus) => {
    return await db.monthly_fee.findMany({
      where: { status },
      include: {
        enrollment: {
          include: {
            student: {
              select: { name: true, contact_number: true },
            },
            class: { select: { name: true } },
          },
        },
      },
    });
  };
  getByEnrollment = async (id: number) =>
    await db.monthly_fee.findMany({
      where: { enrollment_id: id },
      include: {
        enrollment: {
          include: {
            student: {
              select: { name: true, contact_number: true },
            },
            class: { select: { name: true } },
          },
        },
      },
    });
  getCurrentMonth = async (initialDate: Date, finalDate: Date) => {
    return await db.monthly_fee.findMany({
      where: {
        expiration_date: {
          gte: initialDate,
          lte: finalDate,
        },
      },
      include: {
        enrollment: {
          include: {
            student: {
              select: { name: true, contact_number: true },
            },
            class: { select: { name: true } },
          },
        },
      },
    });
  };
  update = async (id: number, data: Partial<MonthlyFeeDTO>) => {
    return await db.monthly_fee.update({
      where: { id },
      data: {
        ...data,
      },
    });
  };
  paidMonthlyFee = async (id: number) => {
    return await db.$transaction(async (tx) => {
      const monthly_fee = await tx.monthly_fee.findUniqueOrThrow({
        where: { id },
        omit:{
          created_at:true,
          expiration_date:true,
          payment_id:true,
          enrollment_id:true
        },
        include: {
          enrollment: {
            include: {
              student: {
                select: { name: true },
              },
              class:{select: {name: true}}
            },
          },
        },
      });

      const payment = await tx.payment.create({
        data: {
          value: monthly_fee.value,
          description: `Pagamento mensalidade da matrícula de ${monthly_fee.enrollment.student.name} na turma ${monthly_fee.enrollment.class.name}.`,
        },
      });

      await tx.monthly_fee.update({
        where: { id },
        data: {
          payment_id: payment.id,
          status: 'PAID',
        },
      });
    });
  };
  createInEnrollmentCreation = async (data: MonthlyFeeDTO) => {
    return await db.monthly_fee.create({
      data: { ...data },
    });
  };
}
