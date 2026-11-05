import * as z from 'zod';
import { studentSchema } from './student.schema';

export const enrollmentSchema = z.object({
  start_date: z.coerce.date(),
  status: z.string().optional(),
  student_id: z.coerce.number().optional(),
  class_id: z.coerce.number(),
  student_data: studentSchema.optional(),
});
