import { useState, useCallback } from 'react';

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [areInputsVisited, setAreInputsVisited] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { id, name, value, type, files } = e.target;

    switch (type) {
      case 'radio':
        setValues({ ...values, [name]: id || value });
        break;

      case 'checkbox':
        if (!values[name]) {
          values[name] = [];
        }

        if (values[name]?.includes(id)) {
          setValues({ ...values, [name]: values[name].filter((el) => el !== id) });
        } else {
          setValues({ ...values, [name]: [...values[name], id] });
        }
        break;

      case 'file':
        if (files.length) {
          setValues({ ...values, [name]: files[0] });
        } else {
          setValues({ ...values, [name]: null });
        }
        break;

      case 'email':
        setValues({ ...values, [name]: value });
        break;

      default:
        setValues({ ...values, [name]: value });
    }

    const errorMessage =
      type === 'email' ? (validateEmail(value) ? null : 'Некорректный email') : e.target.validationMessage;

    setErrors({ ...errors, [name]: areInputsVisited[name] ? errorMessage : '' });
    setIsValid(!errorMessage && e.target.closest?.('form').checkValidity());
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setAreInputsVisited({ ...areInputsVisited, [name]: true });
    setErrors({ ...errors, [name]: e.target.validationMessage });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, handleBlur, errors, isValid, resetForm, setValues, setIsValid };
}
