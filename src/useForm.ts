import _ from 'lodash';
import { useState } from 'react';
import { ValidatorFunction } from './validators';

export type Field<T> = {
  [K in keyof T]: {
    value: T[K];
    errors: string[];
    isValid: boolean;
  };
};

export interface FormState<T> {
  fields: Field<T>;
  isValid: boolean;
}

function useForm<T>(initialValues: T) {
  const initalFormState: FormState<T> = {
    fields: {} as Field<T>,
    isValid: true,
  };
  _.forEach(initialValues as {}, (value, key) => {
    initalFormState.fields[key as keyof FormState<T>['fields']] = {
      errors: [],
      isValid: false,
      value,
    };
  });

  const [form, setForm] = useState<FormState<T>>(initalFormState);

  const returnErrors = (
    validators: Array<ValidatorFunction<any>>,
    value: any
  ) => {
    return _.compact(_.map(validators, validator => validator(value)));
  };

  const validateInitialValue = <K extends keyof Field<T>>(
    key: K,
    validators?: Array<ValidatorFunction<T[K]>>
  ) => {
    const field = form.fields[key];
    if (validators && validators.length > 0) {
      const { value } = field;
      const errors = returnErrors(validators, value);
      const isValid = errors.length === 0;
      setForm(formState => ({
        ...formState,
        fields: {
          ...formState.fields,
          [key]: {
            ...field,
            errors,
            isValid,
          },
        },
        isValid: form.isValid && isValid,
      }));
    } else {
      setForm(formState => ({
        ...formState,
        fields: {
          ...formState.fields,
          [key]: {
            ...field,
            isValid: true,
          },
        },
      }));
    }
  };

  function useField<K extends keyof FormState<T>['fields']>(
    key: K,
    validators?: Array<ValidatorFunction<T[K]>>
  ) {
    const field = form.fields[key];
    if (!field.isValid && field.errors.length === 0) {
      validateInitialValue(key, validators);
    }

    function setValue(newValue: T[K]) {
      const newErrors = validators ? returnErrors(validators, newValue) : [];
      setForm(formState => ({
        ...formState,
        fields: {
          ...formState.fields,
          [key]: {
            errors: newErrors,
            isValid: newErrors.length === 0,
            value: newValue,
          },
        },
      }));
    }
    const { errors, isValid, value } = form.fields[key];
    return {
      errors,
      isValid,
      setValue,
      value,
    };
  }

  const onSubmit = (cb: (data: T) => void) => {
    const cleanedFormData: T = {} as T;
    _.forEach(form.fields, ({ value }, key) => {
      cleanedFormData[key as keyof T] = value;
    });
    cb(cleanedFormData);
  };

  return {
    form,
    onSubmit,
    useField,
  };
}

export default useForm;
