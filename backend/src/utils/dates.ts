export function formatBirthDate(date: string): Date {
  const [day, month, year] = date.replaceAll('-', '/').split('/');
  const formatDate = new Date(+year, +month - 1, +day);
  formatDate.setHours(0, 0, 0, 0)
  formatDate.setUTCHours(0, 0, 0, 0);
  return formatDate
}