import { Decimal } from "@prisma/client/runtime/client";

export interface ClassGroupDTO {
  id?: number;
  name: string;
  teacher_id: number;
  monthly_price: Decimal
  daysOfWeek: number[]
}
