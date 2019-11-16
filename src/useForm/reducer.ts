import { forEach } from 'lodash';
import { FieldValues, Field, Form } from './types';
import { ValidatorFunction } from '../validators';

export const UPDATE_VALUES = 'updateValues';
export const VALIDATE_FIELDS = 'validateFields';
export const VALIDATE_FORM = 'validateForm';

export interface UpdateValuesAction<FormFieldValues> {
  type: typeof UPDATE_VALUES;
  payload: { [key: string]: Partial<FormFieldValues> };
}
export interface ValidateFieldAction<
  T,
  FieldKey extends keyof T,
  Value extends T[FieldKey] = T[FieldKey]
> {
  type: typeof VALIDATE_FIELDS;
  payload: {
    [key: string]: {
      errors: string[];
      validators: Array<ValidatorFunction<Value>>;
    };
  };
}
export interface ValidateFormAction {
  type: typeof VALIDATE_FORM;
  payload: boolean;
}

const createReducer = <T>() => {
  type FormField = Field<T>;
  type FormState = Form<T>;
  type FieldKey = keyof T;
  type FormFieldValues = FieldValues<T, T[FieldKey]>;

  type Action =
    | UpdateValuesAction<FormFieldValues>
    | ValidateFieldAction<T, FieldKey>
    | ValidateFormAction;

  function reducer(state: FormState, action: Action): FormState {
    const { type, payload } = action;
    const newFields = {} as Partial<FormField>;
    switch (type) {
      case UPDATE_VALUES:
        forEach(
          payload as UpdateValuesAction<FormFieldValues>['payload'],
          (fieldValues, key) => {
            newFields[key as FieldKey] = {
              ...state.fields[key as FieldKey],
              ...fieldValues,
            };
          }
        );
        return {
          ...state,
          fields: {
            ...state.fields,
            ...newFields,
          },
        };
      case VALIDATE_FIELDS: {
        forEach(
          payload as ValidateFieldAction<T, FieldKey>['payload'],
          ({ errors, validators }, key) => {
            newFields[key as FieldKey] = {
              ...state.fields[key as FieldKey],
              errors,
              validators,
            };
          }
        );
        return {
          ...state,
          fields: {
            ...state.fields,
            ...newFields,
          },
        };
      }
      case VALIDATE_FORM: {
        return {
          ...state,
          isValid: payload as ValidateFormAction['payload'],
        };
      }
      default:
        throw new Error();
    }
  }
  return reducer;
};

export default createReducer;
