import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsEndDateAfterStartDate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isEndDateAfterStartDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(endDate: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const startDate = (args.object as any)[relatedPropertyName];
          return (
            endDate instanceof Date &&
            startDate instanceof Date &&
            endDate > startDate
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `End date must be after start date`;
        },
      },
    });
  };
}
