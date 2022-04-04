import { useCallback, useState } from 'react';
import { FormControlHook } from 'types';

const useFormControl: FormControlHook = (validationFunction) => {
  const [value, _setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isVisited, setIsVisited] = useState<boolean>(false);

  const setValue = useCallback(
    (newValue) => {
      setIsValid(validationFunction(newValue).isValid);
      _setValue(newValue);
    },
    [validationFunction]
  );

  const setInitialValue = useCallback(
    (initialValue: string) => {
      setValue(initialValue);
    },
    [setValue]
  );

  function onInputChangeHandler(e) {
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
    setValue,
  };
};

export default useFormControl;
