import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { object, string, ref } from 'yup';

import PropTypes from 'prop-types';
import reset from '../actions';
import {
  ErrorMessage,
  FormActions,
  TextField,
} from '../../Shared/components/Form';
import { PrimaryButton } from '../../Shared/components/Button';
import SVG from '../../Shared/components/SVG';

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

function ResetPasswordForm(props) {
  const { isSubmitting, errors } = props;

  return (
    <Form>
      <Field type='hidden' name='token' />
      <Field
        type='password'
        name='password'
        label='New Password'
        component={TextField}
      />
      <Field
        type='password'
        name='confirmPassword'
        label='Confirm password'
        component={TextField}
      />
      {errors.formSubmission && (
        <ErrorMessage>{errors.formSubmission}</ErrorMessage>
      )}
      <FormActions>
        <PrimaryButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <SVG name='spinner' size='25' color='#fff' />
          ) : (
            'Change my Password'
          )}
        </PrimaryButton>
      </FormActions>
    </Form>
  );
}

ResetPasswordForm.propTypes = {
  errors: PropTypes.shape({
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    formSubmission: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

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
