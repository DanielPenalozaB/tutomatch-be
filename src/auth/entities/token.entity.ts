import { Roles } from '../../users/enums/roles.enum';

export class TokenPayload {
  id: number;
  email: string;
  name: string;
  role: Roles;
}