import { Decimal } from "@prisma/client/runtime/client";

export type MonthlyFeeStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELED';
export interface MonthlyFee {
  id: number;
  enrollment_id: number;
  value: Decimal;
  status: MonthlyFeeStatus;
  expiration_date: Date | string;
  payment_id?: number;
  created_at: Date;
  updated_at: Date;
}

export interface MonthlyFeeDTO {
  id?: number;
  enrollment_id: number;
  value: string;
  status: MonthlyFeeStatus;
  expiration_date: Date | string;
  payment_id?: number;
}
