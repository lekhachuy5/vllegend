import React, { useState, useEffect } from "react";

const useForm = (initialFieldValues, validate, setCurrentId) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const {value} = target ? target : target.getData();
    // if(name.includes('editor')){

    //     const fieldValue = { 'descriptions': value };
    //     setValues({
    //       ...values,
    //       ...fieldValue,
    //     });
    // }else{
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
    console.log(values)
    validate(fieldValue);
  };

  const resetForm = () => {
    setValues({
      ...initialFieldValues,
    });
    setErrors({});
    // setCurrentId(0)
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
   
  };
};
export default useForm;
