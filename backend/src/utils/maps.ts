type monthly_feeStatus = 'PAID' | 'CANCELED' | 'OVERDUE' | 'PENDING';
export const statusFieldsAvailableMonthlyFee: Record<monthly_feeStatus, monthly_feeStatus[]> = {
  PENDING: ['PAID', 'CANCELED', 'OVERDUE'],
  PAID: [],
  OVERDUE: ['CANCELED', 'PAID'],
  CANCELED: ['PENDING'],
};
