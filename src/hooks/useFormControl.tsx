import React, { useCallback, useState } from 'react';
import { InputValidation } from '../utils/index';

interface FormControlHook {
  (validationFunction: InputValidation): {
    value: string;
    isValid: boolean;
    onInputChangeHandler: (e: React.FormEvent<Element>) => void;
    onInputBlurHandler: () => void;
    shouldShowError: boolean;
    setInitialValue: (initialValue: string) => void;
  };
}

const useFormControl: FormControlHook = (validationFunction) => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isVisited, setIsVisited] = useState<boolean>(false);

  const setInitialValue = useCallback(
    (initialValue: string) => {
      setValue(initialValue);
      setIsValid(validationFunction(initialValue).isValid);
    },
    [validationFunction]
  );

  function onInputChangeHandler(e) {
    setIsValid(validationFunction(e.target.value).isValid);
    setValue(e.target.value);
  }

  function onInputBlurHandler() {
    setIsVisited(true);
  }

  const shouldShowError = !isValid && isVisited;

  return {
    value,
    isValid,
    onInputChangeHandler,
    onInputBlurHandler,
    shouldShowError,
    setInitialValue,
  };
};

export default useFormControl;
