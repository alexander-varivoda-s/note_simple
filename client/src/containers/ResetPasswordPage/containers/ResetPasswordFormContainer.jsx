import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { object, string, ref } from 'yup';

import PropTypes from 'prop-types';
import ResetPasswordForm from '../components/ResetPasswordForm';
import reset from '../actions';

const initialValues = {
  password: '',
  confirmPassword: '',
};

const validationSchema = object().shape({
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

  dispatch(reset(payload));
};

function ResetPasswordFormContainer(props) {
  const { dispatch, token } = props;

  initialValues.token = token;

  return (
    <Formik
      render={ResetPasswordForm}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit(dispatch)}
    />
  );
}

ResetPasswordFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  null,
  mapDispatchToProps,
)(ResetPasswordFormContainer);
