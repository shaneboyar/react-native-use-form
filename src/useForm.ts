import { useState, useEffect, useCallback, useRef } from 'react';
import { compact, map, every, get, forEach, isEqual } from 'lodash';
import { ValidatorFunction } from './validators';

export type Field<T> = {
  [K in keyof T]: {
    value: T[K];
    errors: string[];
    isValid?: boolean;
    validators?: Array<ValidatorFunction<T[K]>>;
  };
};

export interface Form<T> {
  fields: Field<T>;
  isValid: boolean;
}

/**
 * This hook is to be used in conjuction with the fields inside
 * UI/Form/Fields. Each of those will expect either a `field` or
 * `fieldBuilder`. The `field` prop expects to recieve a value of `useField('someKey')`
 * whereas the `fieldBuilder` prop expects to just recieve the `useField` function
 * itself and will handle the calling of that function itself.
 * Generates Field type based off type passed in as T where T
 * defines the shape of the data which the backend expects to
 * recieve from this form.
 * This assures all field keys present exist in T and their
 * respective values are the appropriate type.
 * @param initialValues
 */
function useForm<T extends {}>(initialValues: T) {
  type FormField = Field<T>;
  type FormState = Form<T>;

  const transformValuesToFormState = (values: T, currentFormState = {}) => {
    const formState: FormState = {
      fields: {} as FormField,
      isValid: true,
      ...currentFormState,
    };
    forEach(values, (value, key) => {
      type Key = keyof FormState['fields'];
      formState.fields[key as Key] = {
        errors: formState.fields[key as Key]
          ? formState.fields[key as Key].errors
          : [],
        isValid: formState.fields[key as Key]
          ? formState.fields[key as Key].isValid
          : undefined,
        validators: formState.fields[key as Key]
          ? formState.fields[key as Key].validators
          : [],
        value,
      };
    });
    return formState;
  };

  /**
   * The initialValues are modified using `transformValuesToFormState` to keep track of their validity and errors.
   * These fields are then added into an object that tracks overall form validity
   * which will serve as our form state
   */
  const [form, setForm] = useState<FormState>(
    transformValuesToFormState(initialValues)
  );

  /**
   * Collects error messages returned from a fields validator and saves them in an
   * array which will be set to form.fields[key].errors
   * @param validators
   * @param value
   */
  const returnErrors = (
    validators: Array<ValidatorFunction<T[keyof T]>>,
    value: T[keyof T]
  ): string[] => {
    return compact(map(validators, validator => validator(value)));
  };

  const validateForm = useCallback(() => {
    let newState = { ...form } as FormState;
    forEach(form.fields, ({ value, validators }, key) => {
      if (validators && validators.length > 0) {
        const errors = returnErrors(validators, value);
        const fieldIsValid = errors.length === 0;
        newState = {
          ...newState,
          fields: {
            ...newState.fields,
            [key]: {
              errors,
              isValid: fieldIsValid,
              validators,
              value,
            },
          },
        };
      }
    });
    const isValid: boolean = every(newState.fields, field =>
      get(field, 'isValid', true)
    );
    newState = { ...newState, isValid };

    if (!isEqual(form, newState)) {
      setForm(newState);
    }
  }, [form]);

  /**
   * When a field's value is updated, we can recheck the validity of the entire form.
   */
  const previousValues = useRef<Array<T[keyof T]>>();
  useEffect(() => {
    previousValues.current = map(form.fields, field => field.value);
  });

  useEffect(() => {
    const currentValues = map(form.fields, field => field.value);
    if (isEqual(previousValues.current, currentValues)) {
      return;
    }
    validateForm();
  });

  /**
   * Since the initial form can be created with data returned from elsewhere,
   * we check if these initial values are valid and set the appropriate errors and
   * validity
   * @param key
   * @param validators
   */
  const validateField = <K extends keyof FormField>(
    key: K,
    validators?: Array<ValidatorFunction<T[keyof T]>>
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
            validators,
          },
        },
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

  /**
   * This function is returned from the useForm hook. It takes a key
   * which must exist in the Type passed in as T
   * @param key
   * @param validators
   * @returns {{value, setValue, errors, isValid}}
   * An object that contains:
   * ```
   * {
   *  value: "the current value of the field"
   *  setValue: "a function that takes in a new, type-checked value, and updates the form state"
   *  errors: "an array of error messages"
   *  isValid: "a boolean representing the validity of this field"
   * }
   * ```
   */
  function useField<K extends keyof FormState['fields']>(
    key: K,
    validators?: Array<ValidatorFunction<T[keyof T]>>
  ) {
    const field = form.fields[key];
    if (!field.isValid && field.errors.length === 0) {
      validateField(key, validators);
    }

    function setValue(newValue: T[K]) {
      const newErrors = validators ? returnErrors(validators, newValue) : [];
      const fieldIsValid = newErrors.length === 0;
      setForm(formState => ({
        ...formState,
        fields: {
          ...formState.fields,
          [key]: {
            errors: newErrors,
            valid: fieldIsValid,
            validators,
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

  function updateForm(values: T) {
    const newState = transformValuesToFormState(values, form);
    setForm({
      ...form,
      ...newState,
    });
  }

  /**
   * This function takes a callback as an argument which then presents the current
   * form state cleaned to match the inital shape of the Type passed as T
   * @param cb
   */
  const onSubmit = (cb: (data: T) => void) => {
    const cleanedFormData: T = {} as T;
    forEach(form.fields, ({ value }, key) => {
      cleanedFormData[key as keyof T] = value;
    });
    cb(cleanedFormData);
  };

  return {
    form,
    onSubmit,
    setForm,
    updateForm,
    useField,
  };
}

export default useForm;
