import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { object, string, ref } from 'yup';

import PropTypes from 'prop-types';
import RegisterForm from '../components/RegisterForm';
import register from '../actions';

const initialValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = object().shape({
  displayName: string().max(32, 'Display name exceeds 32 characters limit.'),
  email: string()
    .email('Email is not valid!')
    .required('Email is required!'),
  password: string()
    .min(6, 'Password too short, has to be at least 6 characters long!')
    .required('Password is required!'),
  confirmPassword: string()
    .oneOf([ref('password')], "Passwords don't match!")
    .required('Password confirmation required.'),
});

const handleSubmit = dispatch => (values, formikBag) => {
  const payload = {
    params: values,
    onSuccess: () => formikBag.setSubmitting(false),
    onFailure: () => {
      formikBag.setSubmitting(false);
    },
  };

  dispatch(register(payload));
};

function RegisterFormContainer(props) {
  const { dispatch } = props;
  return (
    <Formik
      render={RegisterForm}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit(dispatch)}
    />
  );
}

RegisterFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  null,
  mapDispatchToProps,
)(RegisterFormContainer);
