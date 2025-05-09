import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user/user.service';

@ValidatorConstraint({ name: 'isEmailUnique' })
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string, args: ValidationArguments) {
    const user = await this.userService.getByEmail(email);
    return !user;
  }
}
