import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import jwt from 'jsonwebtoken';

import forgot from '../actions';
import {
  ErrorMessage,
  FormActions,
  TextField,
} from '../../Shared/components/Form';
import { PrimaryButton } from '../../Shared/components/Button';
import SVG from '../../Shared/components/SVG';

const initialValues = {
  email: '',
};

const validationSchema = object().shape({
  email: string()
    .email('Email is not valid!')
    .required('Email is required!'),
});

function ForgotPasswordForm(props) {
  const { isSubmitting, errors } = props;

  return (
    <Form>
      <Field type='email' name='email' label='Email' component={TextField} />
      {errors.formSubmission && (
        <ErrorMessage>{errors.formSubmission}</ErrorMessage>
      )}
      <FormActions>
        <PrimaryButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <SVG name='spinner' size='25' color='#fff' />
          ) : (
            'Remind Me'
          )}
        </PrimaryButton>
      </FormActions>
    </Form>
  );
}

ForgotPasswordForm.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    formSubmission: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

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
