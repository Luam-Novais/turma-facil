export interface Student {
  id: number;
  name: string;
  contact_number: string;
  date_birth: string | Date;
  name_responsible: string;
}
export interface StudentDTO {
  name: string;
  contact_number: string;
  date_birth: string | Date;
  name_responsible: string;
}
