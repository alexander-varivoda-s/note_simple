import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { object, string, ref } from 'yup';

import PropTypes from 'prop-types';
import ResetPasswordForm from '../components/ResetPasswordForm';
import reset from '../actions';

const initialValues = {
  password: '',
  confirmPassword: '',
  token: null,
};

const validationSchema = object().shape({
  password: string()
    .min(6, 'Password too short, has to be at least 6 characters long!')
    .required('Password is required!'),
  confirmPassword: string()
    .oneOf([ref('password')], "Passwords don't match!")
    .required('Password confirmation required.'),
});

export default function ResetPasswordFormContainer(props) {
  const { token } = props;

  const dispatch = useDispatch();

  function submitHandler(values, formikBag) {
    const payload = {
      params: values,
      onSuccess: () => formikBag.setSubmitting(false),
      onFailure: () => formikBag.setSubmitting(false),
    };

    dispatch(reset(payload));
  }

  initialValues.token = token;

  return (
    <Formik
      render={ResetPasswordForm}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    />
  );
}

ResetPasswordFormContainer.propTypes = {
  token: PropTypes.string.isRequired,
};
