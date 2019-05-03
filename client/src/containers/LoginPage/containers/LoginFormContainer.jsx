import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { object, string } from 'yup';

import PropTypes from 'prop-types';
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

const handleSubmit = dispatch => (values, formikBag) => {
  const payload = {
    params: values,
    onSuccess: formikBag.setSubmitting(false),
    onFailure: () => {
      formikBag.setSubmitting(false);
      formikBag.setFieldError('formSubmission', 'Login failed. Please try again.');
    },
  };

  dispatch(login(payload));
};

function LoginFormContainer(props) {
  const { dispatch } = props;
  return (
    <Formik
      render={LoginForm}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit(dispatch)}
    />
  );
}

LoginFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  null,
  mapDispatchToProps,
)(LoginFormContainer);
