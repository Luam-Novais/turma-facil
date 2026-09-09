import { db } from '../config/prisma';
import { ClassGroupDTO } from '../types/classGroup';

export default class ClassGroupDTORepository {
  findById = async (classGroup_id: number) => {
    return await db.classGroup.findUnique({
      where: {
        id: classGroup_id,
      },
    });
  };
  get = async () => {
    return await db.classGroup.findMany({
      include: {teacher: true}
    });
  };
  create = async (classGroup: ClassGroupDTO) => {
    return await db.classGroup.create({
      data: { ...classGroup, teacher_id: +classGroup.teacher_id },
    });
  };
  update = async (classGroup_id: number, data: Partial<ClassGroupDTO>) => {
    try {
      return await db.classGroup.update({
        where: { id: classGroup_id },
        data: {
          ...data,
        },
      });
    } catch (error: any) {
      throw error;
    }
  };
  delete = async (classGroup_id: number)=>{
    try {
         return await db.classGroup.delete({
           where: {
             id: classGroup_id,
           },
         });
    } catch (error) {
      throw error
    }
  }
}
