import { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name) => (event) => {
    const value = event.target ? event.target.value : event;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset, setValues };
};
