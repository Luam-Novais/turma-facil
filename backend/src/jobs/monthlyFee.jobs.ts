import cron from 'node-cron';
import { MonthlyFeeService } from '../services/monthlyFee.services';

export function monthly_feeJob(service: MonthlyFeeService) {
  cron.schedule(
    '0 0 1 * *',
    async () => {
      try {
        const result = await service.generateMonthlyFees();
        console.log(`Mensalidades geradas: ${result?.count}`);
      } catch (error) {
        console.error('Erro ao gerar mensalidades:', error);
      }
    },
    {
      timezone: 'America/Sao_Paulo',
    },
  );
}
