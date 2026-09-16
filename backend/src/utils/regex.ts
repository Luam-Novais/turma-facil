export const phoneRegex = /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?9\d{4}-?\d{4}$/;
export function validateRegex(regex:RegExp, data: string): boolean {
  return regex.test(data)
}
