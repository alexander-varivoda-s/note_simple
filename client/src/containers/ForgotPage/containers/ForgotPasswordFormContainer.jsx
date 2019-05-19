import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { object, string } from 'yup';
import jwt from 'jsonwebtoken';

import PropTypes from 'prop-types';
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

const handleSubmit = sendResetPasswordEmail => (values, formikBag) => {
  const cancelSubmission = () => formikBag.setSubmitting(false);
  const { email } = values;
  let token = null;

  try {
    token = jwt.sign({ sub: email }, process.env.REACT_APP_JWT_SECRET, { expiresIn: '1h' });
  } catch (e) {
    formikBag.setFieldError('formSubmission', 'Failed to submit. Please try again.');
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

  sendResetPasswordEmail(payload);
};

function ForgotPasswordFormContainer(props) {
  const { sendResetPasswordEmail } = props;
  return (
    <Formik
      render={ForgotPasswordForm}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit(sendResetPasswordEmail)}
    />
  );
}

ForgotPasswordFormContainer.propTypes = {
  sendResetPasswordEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  sendResetPasswordEmail: payload => dispatch(forgot(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ForgotPasswordFormContainer);
