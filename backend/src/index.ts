import express from 'express';
import studentRoutes from './routes/student.routes';
import teacherRoutes from './routes/teacher.routes';
import classGroupRoutes from './routes/classGroup.routes';
import enrollmentsRoutes from './routes/enrollments.routes';
import { errorMiddleware } from './middlewares/http.middleware';
import dotenv from 'dotenv';
dotenv.config();
const server = express();

server.use(express.json());
server.use(express.urlencoded());

server.use('/students', studentRoutes);
server.use('/teacher', teacherRoutes);
server.use('/classGroup', classGroupRoutes);
server.use('/enrollments', enrollmentsRoutes);

server.use(errorMiddleware);
server.listen(3000, () => [console.log('Hello word, Servidor rodando em porta 3000.')]);
