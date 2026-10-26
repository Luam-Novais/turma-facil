import { MonthlyFeeRepository } from '../repository/monthlyFee.repository';
import { HttpError } from '../middlewares/http.middleware';
import { ClassGroupDTO } from '../types/classGroup';
import { cleanString } from '../utils/string';
import { MonthlyFeeDTO } from '../types/monthlyFee';

export class MonthlyFeeService {
  constructor(private repository: MonthlyFeeRepository) {}
  get = async (filter?: string) => {
    try {
      if (!filter || filter === 'undefined') return await this.repository.get();
      switch (cleanString(filter)) {
        default:
          return await this.repository.get();
        case 'paid': {
          return await this.repository.getByStatus('PAID');
        }
        case 'pending': {
          return await this.repository.getByStatus('PENDING');
        }
        case 'overdue': {
          return await this.repository.getByStatus('OVERDUE');
        }
        case 'canceled': {
          return await this.repository.getByStatus('CANCELED');
        }
        case 'currentMonth': {
          const date = new Date();
          const initialDate = new Date(date.getFullYear(), date.getMonth(), 1);
          const finalDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          return await this.repository.getCurrentMonth(initialDate, finalDate);
        }
        case 'byEnrollment': {
          const enrollmentId = Number(filter.split(':')[1]);
          return await this.repository.getByEnrollment(enrollmentId);
        }
      }
    } catch (error: any) {
      if ((error.code = '')) throw new HttpError(400, 'Falha ao buscar mensalidades.');
    }
  };
  update = async (id: number, data: MonthlyFeeDTO) => {
    try {
      if (!id) throw new HttpError(404, 'identificador da mensalidade não enviado.');
      if (!data) throw new HttpError(404, 'dados para atualização não enviados.');
      if (data.status && data.status === 'PAID') return await this.repository.paidMonthlyFee(id);
      return await this.repository.update(id, data);
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpError(404, 'Mensalidade não encontrada.');
      }
      throw error;
    }
  };
  createInitialMonthlyFee = (classGroup: ClassGroupDTO) => {
    if (!classGroup.daysOfWeek || classGroup.daysOfWeek.length < 1) throw new HttpError(400, 'Falha ao calcular valor da mensalidade devido a falta dos dias de aulas.');
    const expiration_date = this.calculateExpirationDate();

    return {
      expiration_date,
      ...this.calculateValueMonthlyFee(classGroup),
    };
  };
  private calculateExpirationDate = () => {
    const expiration_date = new Date();
    expiration_date.setHours(0, 0, 0, 0);
    if (expiration_date.getDate() < 15) expiration_date.setDate(15);
    else expiration_date.setDate(expiration_date.getDate() + 1);

    return expiration_date;
  };
  private calculateValueMonthlyFee = (classGroup: ClassGroupDTO) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const quantity = this.countRemainingClassDay(today, lastDayMonth, classGroup.daysOfWeek);

    if (today.getDate() <= 15 || quantity > 4) {
      return {
        value: classGroup.monthly_price,
        quantity,
      };
    }
    switch (quantity) {
      case 4: {
        return {
          value: 70,
          quantity,
        };
      }
      case 3: {
        return {
          value: 60,
          quantity,
        };
      }
      case 2: {
        return {
          value: 50,
          quantity,
        };
      }
      default: {
        return {
          value: 0,
          quantity,
        };
      }
    }
  };
  private countRemainingClassDay = (today: Date, lastDayMonth: Date, days: number[]) => {
    let date = new Date(today);
    let quantity = 0;
    for (date; date <= lastDayMonth; date.setDate(date.getDate() + 1)) {
      const daysOfWeek = date.getDay();
      if (days.includes(daysOfWeek)) {
        quantity++;
      }
    }
    return quantity;
  };
}
