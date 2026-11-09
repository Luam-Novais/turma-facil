import * as z from 'zod';

export const teacherSchema = z.object({
  name: z.string(),
  contact_number: z.string(),
});

export const updateTeacherSchema = teacherSchema.partial().strict();
