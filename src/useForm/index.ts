import { useEffect, useRef, useCallback, useReducer } from 'react';
import { compact, map, flatMap, every, forEach, isEqual } from 'lodash';
import createReducer, {
  VALIDATE_FORM,
  VALIDATE_FIELDS,
  UPDATE_VALUES,
  ValidateFieldAction,
  UpdateValuesAction,
} from './reducer';
import { Field, FieldValues, Form } from './types';
import { ValidatorFunction } from '../validators';

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
  type FieldKey = keyof T;
  type FormFieldValues = FieldValues<T, T[FieldKey]>;

  const transformValuesToFormState = (values: T, currentFormState = {}) => {
    const formState: FormState = {
      fields: {} as FormField,
      isValid: true,
      ...currentFormState,
    };
    forEach(values, (value, key) => {
      formState.fields[key as FieldKey] = {
        errors: formState.fields[key as FieldKey]
          ? formState.fields[key as FieldKey].errors
          : [],
        value,
      };
    });
    return formState;
  };

  function init(values: T): FormState {
    return transformValuesToFormState(values);
  }

  const reducer = createReducer<T>();

  const [form, dispatch] = useReducer(reducer, initialValues, init);

  /**
   * Collects error messages returned from a fields validator and saves them in an
   * array which will be set to form.fields[key].errors
   * @param validators
   * @param value
   */
  const returnErrors = <Value>(
    validators: Array<ValidatorFunction<Value>>,
    value: Value
  ): string[] => {
    return compact(map(validators, validator => validator(value)));
  };

  /**
   * When a field's value is updated, we can recheck the validity of the entire form.
   */
  const validateForm = () => {
    const isValid: boolean = every(
      form.fields,
      field => field.errors.length === 0
    );
    dispatch({ type: VALIDATE_FORM, payload: isValid });
  };
  const previousValues = useRef<Array<T[FieldKey]>>();
  const previousErrors = useRef<string[]>();
  useEffect(() => {
    const currentValues = map(form.fields, field => field.value);
    const currentErrors = flatMap(form.fields, field => field.errors);
    if (
      isEqual(previousValues.current, currentValues) &&
      isEqual(previousErrors.current, currentErrors)
    ) {
      return;
    }
    validateForm();
  });
  useEffect(() => {
    previousValues.current = map(form.fields, field => field.value);
    previousErrors.current = flatMap(form.fields, field => field.errors);
  });

  /**
   * Since the initial form can be created with data returned from elsewhere,
   * we check if these initial values are valid and set the appropriate errors and
   * validity
   * @param key
   * @param validators
   */
  const validateField = <K extends FieldKey, Value extends T[K]>(
    key: K,
    validators: Array<ValidatorFunction<Value>>
  ) => {
    const field = form.fields[key];
    const { value } = field;
    const errors = returnErrors<Value>(validators, value as Value);
    const validateFieldAction: ValidateFieldAction<T, FieldKey, Value> = {
      payload: { [key]: { errors, validators } },
      type: VALIDATE_FIELDS,
    };
    dispatch(validateFieldAction as ValidateFieldAction<T, FieldKey>);
  };

  /**
   * This function is returned from the useForm hook. It takes a key
   * which must exist in the Type passed in as T
   * @param key
   * @param validators
   * @returns {{value, setValue, errors}}
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
  function useField<K extends FieldKey>(
    key: K,
    validators?: Array<ValidatorFunction<T[K]>>
  ) {
    useEffect(() => {
      if (validators) {
        validateField(key, validators);
      }
    }, []);
    function setValue<ValueType extends T[K]>(newValue: ValueType) {
      const newErrors = validators ? returnErrors(validators, newValue) : [];
      const updateValuesAction: UpdateValuesAction<FormFieldValues> = {
        payload: {
          [key]: {
            errors: newErrors,
            value: newValue,
          },
        },
        type: UPDATE_VALUES,
      };
      dispatch(updateValuesAction);
    }

    const { value, errors } = form.fields[key];
    return {
      errors,
      setValue,
      value,
    };
  }

  /**
   * This can be used to take an object in the shape of { [key: FieldKey]: newValue }
   * and update those fields in the form state simultaneously.
   */
  const updateForm = useCallback((fields: T) => {
    const newValues = {} as FormField;
    forEach(fields, (value, key) => {
      newValues[key as FieldKey] = {
        errors: [],
        value,
      };
    });
    const updateValuesAction: UpdateValuesAction<FormFieldValues> = {
      payload: newValues,
      type: UPDATE_VALUES,
    };
    dispatch(updateValuesAction);
  }, []);

  /**
   * This function takes a callback as an argument which then presents the current
   * form state cleaned to match the inital shape of the Type passed as T
   * @param cb
   */
  const onSubmit = (cb: (data: T) => void) => {
    const cleanedFormData: T = {} as T;
    forEach(form.fields, ({ value }, key) => {
      cleanedFormData[key as FieldKey] = value;
    });
    cb(cleanedFormData);
  };

  return {
    form,
    onSubmit,
    updateForm,
    useField,
  };
}

export default useForm;
