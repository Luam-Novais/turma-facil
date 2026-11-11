import { db } from '../config/prisma';
import { Decimal } from '@prisma/client/runtime/client';
import { MonthlyFee, MonthlyFeeDTO, MonthlyFeeStatus } from '../types/monthlyFee';
import { HttpError } from '../middlewares/http.middleware';
import { statusFieldsAvailableMonthlyFee } from '../utils/maps';

interface CreateManyMonthlyFee {
  enrollment_id: number;
  value: number | Decimal;
  expiration_date: Date;
}

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
    await db.monthly_fee.findUniqueOrThrow({
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
  getPending = async () => {
    return await db.monthly_fee.findMany();
  };
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
  //UPDATE
  pay = async (id: number) => {
    return await db.$transaction(async (tx) => {
      const monthly_fee = await tx.monthly_fee.findUniqueOrThrow({
        where: { id },
        omit: {
          created_at: true,
          expiration_date: true,
          payment_id: true,
          enrollment_id: true,
        },
        include: {
          enrollment: {
            include: {
              student: {
                select: { name: true },
              },
              class: { select: { name: true } },
            },
          },
        },
      });
      if (!statusFieldsAvailableMonthlyFee[monthly_fee.status].includes('PAID')) {
        throw new HttpError(400, 'O status desta mensalidade não pode ser atualizada para paga.');
      }
      const payment = await tx.payment.create({
        data: {
          value: monthly_fee.value,
          description: `Pagamento mensalidade da matrícula de ${monthly_fee.enrollment.student.name} na turma ${monthly_fee.enrollment.class.name}.`,
        },
      });
      return await tx.monthly_fee.update({
        where: { id },
        data: {
          payment_id: payment.id,
          status: 'PAID',
        },
      });
    });
  };
  cancel = async (id: number) => {
    return await db.$transaction(async (tx) => {
      const monthly_fee = await tx.monthly_fee.findUniqueOrThrow({
        where: { id },
        select: {
          status: true,
          id: true,
        },
      });

      if (!statusFieldsAvailableMonthlyFee[monthly_fee.status].includes('CANCELED')) {
        throw new HttpError(400, 'O status desta mensalidade não pode ser atualizada para cancelada.');
      }
      return await tx.monthly_fee.update({
        where: { id },
        data: {
          status: 'CANCELED',
        },
      });
    });
  };
  overdue = async () => {
    return await db.monthly_fee.updateMany({
      where: {
        status: 'PENDING',
        expiration_date: {
          lt: new Date(),
        },
      },
      data: {
        status: 'OVERDUE',
      },
    });
  };
  //CREATE
  generateMonthlyFees = async (monthly_feeData: CreateManyMonthlyFee[]) => {
    return await db.monthly_fee.createMany({
      data: monthly_feeData,
      skipDuplicates: true,
    });
  };
  createInEnrollmentCreation = async (data: MonthlyFeeDTO) => {
    return await db.monthly_fee.create({
      data: { ...data },
    });
  };
}
