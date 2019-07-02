import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';

import LoginForm from '../components/LoginForm';
import login from '../actions';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = object().shape({
  email: string()
    .email('Email is not valid!')
    .required('Email is required!'),
  password: string()
    .min(6, 'Password too short, has to be at least 6 characters long!')
    .required('Password is required!'),
});

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  function submitHandler(values, formikBag) {
    const payload = {
      params: values,
      onSuccess: () => formikBag.setSubmitting(false),
      onFailure: () => formikBag.setSubmitting(false),
    };

    dispatch(login(payload));
  }
  return (
    <Formik
      render={LoginForm}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    />
  );
}
