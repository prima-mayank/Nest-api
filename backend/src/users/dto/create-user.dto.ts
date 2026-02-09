import { Roles } from '../../utility/common/user-roles.enum';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  roles?: Roles[];
}
