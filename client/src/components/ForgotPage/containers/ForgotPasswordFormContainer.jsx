import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import jwt from 'jsonwebtoken';

import ForgotPasswordForm from '../components/ForgotPasswordForm';
import forgot from '../actions';

const initialValues = {
  email: '',
};

const validationSchema = object().shape({
  email: string()
    .email('Email is not valid!')
    .required('Email is required!'),
});

export default function ForgotPasswordFormContainer() {
  const dispatch = useDispatch();

  function submitHandler(values, formikBag) {
    const cancelSubmission = () => formikBag.setSubmitting(false);
    const { email } = values;

    let token = null;

    try {
      token = jwt.sign({ sub: email }, process.env.REACT_APP_JWT_SECRET, {
        expiresIn: '1h',
      });
    } catch (e) {
      formikBag.setFieldError(
        'formSubmission',
        'Failed to submit. Please try again.'
      );
      cancelSubmission();
    }

    const payload = {
      params: {
        email,
        token,
      },
      onSuccess: cancelSubmission,
      onFailure: () => {
        cancelSubmission();
      },
    };

    dispatch(forgot(payload));
  }

  return (
    <Formik
      render={ForgotPasswordForm}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    />
  );
}
