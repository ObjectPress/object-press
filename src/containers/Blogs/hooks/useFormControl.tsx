import React, { useState } from 'react';

interface FormControlHook {
  (validationFunction: (value: string) => boolean): {
    value: string;
    isValid: boolean;
    onInputChangeHandler: (e: React.FormEvent<Element>) => void;
    onInputBlurHandler: () => void;
    shouldShowError: boolean;
  };
}

const useFormControl: FormControlHook = (validationFunction) => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isVisited, setIsVisited] = useState<boolean>(false);

  function onInputChangeHandler(e) {
    setIsValid(validationFunction(e.target.value));
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
  };
};

export default useFormControl;
