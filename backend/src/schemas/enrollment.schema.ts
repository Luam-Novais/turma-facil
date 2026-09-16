import * as z from 'zod'
import { studentSchema } from './student.schema';

export const enrollmentSchema = z.object({
  start_date: z.string(),
  status: z.coerce.boolean(),
  student_id: z.coerce.number().optional(),
  class_id: z.coerce.number(),
  student_data: studentSchema.optional()
});
