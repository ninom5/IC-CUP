import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@ValidatorConstraint({ name: 'isEmailUniques' })
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string, args: ValidationArguments) {
    const user = await this.userService.getByEmail(email);
    return !user;
  }
}
