import express from 'express';
import studentRoutes from './routes/student.routes';
import teacherRoutes from './routes/teacher.routes';
import classGroupRoutes from './routes/classGroup.routes';
import enrollmentsRoutes from './routes/enrollments.routes';
import monthlyFeeRoutes from './routes/monthlyFee.routes';
import { errorMiddleware } from './middlewares/http.middleware';
import dotenv from 'dotenv';
import { Monthly_feeJobs } from './jobs/monthlyFee.jobs';
import { MonthlyFeeService } from '../src/services/monthlyFee.services';
import { MonthlyFeeRepository } from '../src/repository/monthlyFee.repository';
import { EnrollmentsRepository } from '../src/repository/enrollments.repository';
dotenv.config();

const monthlyFeeService = new MonthlyFeeService(new MonthlyFeeRepository(), new EnrollmentsRepository());
const monthly_feeJob = new Monthly_feeJobs(monthlyFeeService);
const server = express();


server.use(express.json());
server.use(express.urlencoded());

server.use('/students', studentRoutes);
server.use('/teacher', teacherRoutes);
server.use('/classGroup', classGroupRoutes);
server.use('/enrollments', enrollmentsRoutes);
server.use('/monthlyFee', monthlyFeeRoutes);

server.use(errorMiddleware);
server.listen(3000, () => [console.log('Hello word, Servidor rodando em porta 3000.')]);

monthly_feeJob.initial();
monthly_feeJob.generateMonthlyFees();
monthly_feeJob.updateToOverdue();
