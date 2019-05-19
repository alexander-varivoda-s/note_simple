import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';
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

const handleSubmit = signIn => (values, formikBag) => {
  const payload = {
    params: values,
    onSuccess: () => formikBag.setSubmitting(false),
    onFailure: () => {
      formikBag.setSubmitting(false);
    },
  };

  signIn(payload);
};

function LoginFormContainer(props) {
  const { signIn } = props;
  return (
    <Formik
      render={LoginForm}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit(signIn)}
    />
  );
}

LoginFormContainer.propTypes = {
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({ signIn: payload => dispatch(login(payload)) });

export default connect(
  null,
  mapDispatchToProps,
)(LoginFormContainer);
