import * as z from 'zod';

export const classGroupSchema = z.object({
  name: z.string(),
  teacher_id: z.coerce.number(),
  monthly_price: z.coerce.number(),
});
