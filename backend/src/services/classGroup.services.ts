import { HttpError } from '../middlewares/http.middleware';
import ClassGroupsRepository from '../repository/classGroup.repository';
import { type ClassGroupDTO } from '../types/classGroup';



export default class ClassGroupService {
  constructor(private repository: ClassGroupsRepository) {}
  get = async () => {
    return await this.repository.get();
  };
  create = async (classGroup: ClassGroupDTO) => {
    try {
      const created = await this.repository.create(classGroup);
      return created;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };
  update = async (classGroup_id: number, data: Partial<ClassGroupDTO>) => {
    try {
      const formated = {...data, teacher_id: data.teacher_id? Number(data.teacher_id) : undefined}
      const updated = await this.repository.update(+classGroup_id, formated);
      return updated;
    } catch (error: any) {
      if (error.code === `P2025`) {
        throw new HttpError(404, 'Turma não encontrada.');
      }
      throw error;
    }
  };
  delete = async (classGroup_id: number) => {
    try {
      const deleted = await this.repository.delete(+classGroup_id);
      return deleted;
    } catch (error: any) {
      if (error.code === `P2025`) {
        throw new HttpError(404, 'Turma não encontrada.');
      }
      throw error;
    }
  };
}
