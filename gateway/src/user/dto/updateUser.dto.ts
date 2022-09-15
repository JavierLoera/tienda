export class UpdateUserDTO {
  name: string;
  email: string;
  password: string;
  role: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
