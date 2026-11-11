import cron from 'node-cron';
import { MonthlyFeeService } from '../services/monthlyFee.services';

export class Monthly_feeJobs {
  constructor(private service: MonthlyFeeService) {}
  initial = () => {
    console.log('inicializando e agendando cron jobs...');
  };
  generateMonthlyFees = () => {
    cron.schedule(
      '0 0 1 * *',
      async () => {
        try {
          const result = await this.service.generateMonthlyFees();
          console.log(`Mensalidades geradas: ${result?.count}`);
        } catch (error) {
          console.error('Erro ao gerar mensalidades:', error);
        }
      },
      {
        timezone: 'America/Sao_Paulo',
      },
    );
  };
  updateToOverdue = () => {
    cron.schedule(
      '0 0 0 * * *',
      async () => {
        try {
          const result = await this.service.updateToOverdue();
          console.log(`Mensalidades atualizadas: ${result?.count}`);
        } catch (error) {
          console.error('Erro ao atualizar mensalidades:', error);
        }
      },
      {
        timezone: 'America/Sao_Paulo',
      },
    );
  };
}
