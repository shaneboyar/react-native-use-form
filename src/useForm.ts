import { useState } from 'react';
import _ from 'lodash';
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
      value,
      isValid: false,
      errors: [],
    };
  });

  const [form, setForm] = useState<FormState<T>>(initalFormState);

  const returnErrors = (validators: ValidatorFunction<any>[], value: any) => {
    return _.compact(_.map(validators, validator => validator(value)));
  };

  const validateInitialValue = <K extends keyof Field<T>>(
    key: K,
    validators?: ValidatorFunction<T[K]>[]
  ) => {
    const field = form.fields[key];
    if (validators && validators.length > 0) {
      const { value } = field;
      const errors = returnErrors(validators, value);
      const isValid = errors.length === 0;
      setForm(form => ({
        ...form,
        fields: {
          ...form.fields,
          [key]: {
            ...field,
            errors,
            isValid,
          },
        },
        isValid: form.isValid && isValid,
      }));
    } else {
      setForm(form => ({
        ...form,
        fields: {
          ...form.fields,
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
    validators?: ValidatorFunction<T[K]>[]
  ) {
    const field = form.fields[key];
    if (!field.isValid && field.errors.length === 0) {
      validateInitialValue(key, validators);
    }

    function setValue(newValue: T[K]) {
      const errors = validators ? returnErrors(validators, newValue) : [];
      const isValid = errors.length === 0;
      setForm(form => ({
        ...form,
        fields: {
          ...form.fields,
          [key]: { value: newValue, errors, isValid },
        },
      }));
    }
    const { value, errors, isValid } = form.fields[key];
    return {
      value,
      setValue,
      errors,
      isValid,
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
    useField,
    onSubmit,
  };
}

export default useForm;
