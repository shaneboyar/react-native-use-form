import React, { useState, useEffect, useCallback } from 'react';
import { View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { Address } from 'aap-b2c-api-sdk';
import { states } from '@assets/json/usa-states.json';
import { debounce, Cancelable } from 'lodash';
import { isRequired, ValidatorFunction } from '@hooks/useForm';
import {
  actions as storesActions,
  fetchPlacesSuggestions,
  fetchDetailedPlaceSuggestion,
  fetchDetailedPlacesSuggestions,
} from '@actions/stores';
import {
  getDetailedPlacesSuggestions,
  getDetailedPlaceSuggestion,
} from '@selectors/stores';
import TouchableList from '@components/UI/TouchableList';
import useActions from '@hooks/useActions';

import { TextField, FieldGroup, PickerField } from '../..';
import styles from './styles';

export interface AddressFieldsProps {
  fieldBuilder: <K extends keyof Address>(
    key: K,
    validators?: ValidatorFunction<Address[K]>[]
  ) => {
    value: Address[K];
    setValue: (newValue: Address[K]) => void;
    errors: string[];
    isValid: boolean;
  };
  containerStyle?: ViewStyle;
}

const actions = {
  fetchDetailedPlacesSuggestions,
  fetchDetailedPlaceSuggestion,
  fetchPlacesSuggestions,
  clearDetailedPlaceSuggestions: storesActions.clearDetailedPlaceSuggestion,
};

const AddressFields = ({
  fieldBuilder,
  containerStyle,
}: AddressFieldsProps) => {
  const [hideSuggestions, setHideSuggestions] = useState(false);
  const addressControls = {
    addressLine1: fieldBuilder('addressLine1', [isRequired]),
    addressLine2: fieldBuilder('addressLine2'),
    city: fieldBuilder('city'),
    state: fieldBuilder('state'),
    zipCode: fieldBuilder('zipCode'),
  };
  const { addressLine1, addressLine2, city, state, zipCode } = addressControls;

  // REDUX
  const detailedPlacesSuggestions = useSelector(getDetailedPlacesSuggestions);
  const detailedPlacesSuggestion = useSelector(getDetailedPlaceSuggestion);

  const {
    fetchDetailedPlacesSuggestions,
    fetchDetailedPlaceSuggestion,
    clearDetailedPlaceSuggestions,
  } = useActions(actions);

  // effect to update fieldValues when user selected a suggestion
  // which will update detailedPlacesSuggestion value
  useEffect(() => {
    if (detailedPlacesSuggestion) {
      addressLine1.setValue(detailedPlacesSuggestion.address1);
      city.setValue(detailedPlacesSuggestion.city);
      state.setValue(detailedPlacesSuggestion.state);
      zipCode.setValue(detailedPlacesSuggestion.zip);
      setHideSuggestions(true);
    }

    return () => clearDetailedPlaceSuggestions();
  }, [detailedPlacesSuggestion]);

  useEffect(() => {
    if (addressLine1.value.length < 1) {
      addressLine2.setValue('');
      city.setValue('');
      state.setValue('');
      zipCode.setValue('');
    }
  }, [addressLine1.value]);

  // dispatches action to fetch location suggestions
  const handleSearch = (searchPhrase: string) => {
    fetchDetailedPlacesSuggestions({
      searchPhrase,
      sessionToken: '1234',
    });
  };

  /**
   * `debounced` is the debounced version of the `handleSearch` method.
   * This will only invoke after the set time and will cancel
   * previous calls when new calls are made within the debounce window.
   */
  const [debounced] = useState<((value: string) => void) & Cancelable>(() => {
    return debounce((searchPhrase: string) => handleSearch(searchPhrase), 750);
  });

  /**
   * function specifically used for the first address field
   * which will handle side-effects to fetch location suggestions
   */
  const handleOnChangeAddressFields = useCallback(
    (value: string) => {
      setHideSuggestions(false);
      addressLine1.setValue(value);

      if (!value) {
        addressLine1.setValue('');
        city.setValue('');
        state.setValue('');
        zipCode.setValue('');
      }
      debounced.cancel();
      return debounced(value);
    },
    [addressLine1, debounced, city, state, zipCode]
  );

  /**
   * invoked when user clicks on a location suggestion,
   * we'll fire an API call to get the full details of
   * the selected location suggestion
   */
  const handleSelectLocationSuggestion = async (location: string) => {
    const matchingSuggestion = detailedPlacesSuggestions.find(
      x => x.description === location
    );

    if (matchingSuggestion && matchingSuggestion.placeId) {
      fetchDetailedPlaceSuggestion({
        placeId: matchingSuggestion.placeId,
      });
    }

    return null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextField
        field={{
          value: addressLine1.value,
          setValue: text => {
            handleOnChangeAddressFields(text);
          },
          isValid: addressLine1.isValid,
          errors: addressLine1.errors,
        }}
        label="Street Address"
        placeholder="Placeholder"
        onBlur={() => setHideSuggestions(true)}
      />
      {detailedPlacesSuggestions &&
        detailedPlacesSuggestions.length > 0 &&
        addressLine1.value !== '' &&
        !hideSuggestions && (
          <TouchableList
            items={detailedPlacesSuggestions.map(x => x.description)}
            keyExtractor={suggestion => suggestion}
            onSelect={location => handleSelectLocationSuggestion(location)}
            accessibilityLabel="Address Locations"
            itemAccessibilityLabelPrefix="Choose "
          />
        )}
      {addressLine1.value ? (
        <>
          <TextField
            field={addressLine2}
            label="Street Address 2"
            placeholder="Placeholder"
          />
          <TextField field={city} label="City" placeholder="Placeholder" />
          <FieldGroup>
            <PickerField
              field={state}
              label="State"
              options={states.map(state => ({
                label: state.abbr,
                value: state.name,
              }))}
            />
            <TextField
              field={zipCode}
              label="Zip Code"
              placeholder="Placeholder"
            />
          </FieldGroup>
        </>
      ) : null}
    </View>
  );
};

export default AddressFields;
