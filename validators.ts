
export type ValidatorFunction<V> = (value: V) => string | undefined;

export const isRequired: ValidatorFunction<
  string | boolean | number
> = input => {
  if (!input) {
    return 'This field is required.';
  }
  return undefined;
};

export const minimumLengthOf = (length: number): ValidatorFunction<string> => {
  return function(input: string) {
    if (!(input.length >= length)) {
      return `Needs to be at least ${length} characters.`;
    }
    return undefined;
  };
};