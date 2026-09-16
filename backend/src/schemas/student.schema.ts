import * as z from 'zod';

export const studentSchema = z.object({
    name: z.string(),
    contact_number: z.string(),
    date_birth: z.coerce.date(),
    name_responsible: z.string().optional()
})
