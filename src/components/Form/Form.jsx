import React, { useEffect, useRef, useState } from 'react';

/**
 *
 * @param {*} children - Вложенные в компонент теги
 * @param {Function} onSubmit - Коллбек на сабмит формы
 * @param {string} inputClass - Класс полей input внутри формы
 * @param {string} errorMsgClass - Класс, элементов для отображения ошибок
 */
const Form = ({
  style,
  children,
  onSubmit,
  inputClass = 'input-field__input',
  errorMsgClass = 'input-field__error-message',
  errorMsgHiddenClass = 'input-field__error-message__hidden',
  errorMsgInvalidClass = 'input-field__error-message__invalid',
}) => {
  const formRef = useRef();

  const [fields, setFields] = useState({});

  const handleValidation = () => {
    let isFormValid = true;

    for (let field of Object.values(fields)) {
      if (!field.inputElement.validity.valid) {
        field.isPure = false;
        field.errorElement.textContent = field.inputElement.validationMessage;
        field.errorElement.classList.remove(errorMsgHiddenClass);
        field.inputElement.classList.add(errorMsgInvalidClass);
        isFormValid = false;
      }
    }

    return isFormValid;
  };

  const getFieldsData = () => {
    const data = {};

    console.log(fields);
    for (let [name, field] of Object.entries(fields)) {
      if (field.inputElement.type === 'file') {
        data[name] = field.inputElement.files[0];
      } else if (field.inputElement.type === 'checkbox' || field.inputElement.type === 'radio') {
        data[name] = field.inputElement.checked;
      } else {
        data[name] = field.inputElement.value;
      }
    }
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(fields);

    if (handleValidation()) {
      onSubmit(getFieldsData());
    }
  };

  useEffect(() => {
    const inputs = Array.from(formRef.current.querySelectorAll('.' + inputClass));
    const errors = Array.from(formRef.current.querySelectorAll('.' + errorMsgClass));

    errors.forEach((errorElement) => {
      errorElement.classList.add(errorMsgHiddenClass);
    });

    const tempFields = {};

    inputs.forEach((inputElement, index) => {
      // Если поле с таким именем уже есть - сообщаю об этом
      if (tempFields[inputElement.name]) {
        console.log(
          `Поле name='${inputElement.name}' встречается более 1 раза. Валидация будет активна только для последнего из них`,
        );
      }

      tempFields[inputElement.name] = { inputElement: inputElement, errorElement: errors[index], isPure: true };
    });

    setFields(tempFields);
  }, [errorMsgClass, inputClass, errorMsgHiddenClass]);

  useEffect(() => {
    const handleInput = (field) => {
      if (field.inputElement.validity.valid || field.isPure) {
        field.errorElement.classList.add(errorMsgHiddenClass);
        field.inputElement.classList.remove(errorMsgInvalidClass);
      } else {
        field.errorElement.textContent = field.inputElement.validationMessage;
        field.errorElement.classList.remove(errorMsgHiddenClass);
        field.inputElement.classList.add(errorMsgInvalidClass);
      }
    };

    const handleInputBlur = (field) => {
      field.isPure = false;
      field.errorElement.textContent = field.inputElement.validationMessage;
      handleInput(field);
    };

    for (let field of Object.values(fields)) {
      field.inputElement.addEventListener('input', () => handleInput(field));
      field.inputElement.addEventListener('blur', () => handleInputBlur(field));
    }
  }, [fields, errorMsgClass, inputClass, errorMsgInvalidClass, errorMsgHiddenClass]);

  return (
    <form onSubmit={handleSubmit} style={style} ref={formRef} noValidate>
      {children}
    </form>
  );
};

export default Form;
