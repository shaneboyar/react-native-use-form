import { ValidatorFunction } from '../validators';

export interface FieldValues<T, Value extends T[keyof T]> {
  value: Value;
  errors: string[];
  validators?: Array<ValidatorFunction<T[keyof T]>>;
}

export type Field<T> = { [K in keyof T]: FieldValues<T, T[K]> };

export interface Form<T> {
  fields: Field<T>;
  isValid: boolean;
}
