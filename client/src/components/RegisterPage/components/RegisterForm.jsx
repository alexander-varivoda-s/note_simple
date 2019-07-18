import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { object, string, ref } from 'yup';

import { registerAction } from '../actions';
import {
  ErrorMessage,
  FormActions,
  TextField,
} from '../../Shared/components/Form';
import { PrimaryButton } from '../../Shared/components/Button';
import SVG from '../../Shared/components/SVG';

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

function RegisterForm(props) {
  const { isSubmitting, errors } = props;

  return (
    <Form>
      <Field
        type='text'
        name='displayName'
        label='Display Name'
        component={TextField}
      />
      <Field type='email' name='email' label='Email' component={TextField} />
      <Field
        type='password'
        name='password'
        label='Password'
        component={TextField}
      />
      <Field
        type='password'
        name='confirmPassword'
        label='Confirm Password'
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
            'Sing up'
          )}
        </PrimaryButton>
      </FormActions>
    </Form>
  );
}

RegisterForm.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default function RegisterFormContainer() {
  const dispatch = useDispatch();

  function submitHandler(values, formikBag) {
    const payload = {
      params: values,
      onSuccess: () => formikBag.setSubmitting(false),
      onFailure: () => formikBag.setSubmitting(false),
    };

    dispatch(registerAction(payload));
  }
  return (
    <Formik
      render={RegisterForm}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    />
  );
}
