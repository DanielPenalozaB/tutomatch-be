import { SetMetadata } from '@nestjs/common';
import { Roles as UserRoles } from '../../users/enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);