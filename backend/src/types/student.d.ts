export interface Student {
  id: number;
  name: string;
  contatc_number: string;
  date_birth: string | Date;
  name_responsible: string;
}
export interface StudentDTO {
  id?: number;
  name: string;
  contatc_number: string;
  date_birth: string | Date;
  name_responsible: string;
}
export interface StudentUpdate {
  id?: number;
  name?: string;
  contatc_number?: string;
  date_birth?: string | Date;
  name_responsible?: string;
}