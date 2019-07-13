import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';

import login from '../actions';
import {
  ErrorMessage,
  FormActions,
  TextField,
} from '../../Shared/components/Form';
import Button from '../../Shared/components/Button';
import SVG from '../../Shared/components/SVG';

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

function LoginForm(props) {
  const { isSubmitting, errors } = props;

  return (
    <Form>
      <Field type='email' name='email' label='Email' component={TextField} />
      <Field
        type='password'
        name='password'
        label='Password'
        component={TextField}
      />
      {errors.formSubmission && (
        <ErrorMessage>{errors.formSubmission}</ErrorMessage>
      )}
      <FormActions>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <SVG name='spinner' size='25' color='#fff' />
          ) : (
            'Log in'
          )}
        </Button>
      </FormActions>
    </Form>
  );
}

LoginForm.propTypes = {
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

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  function submitHandler(values, formikBag) {
    const payload = {
      params: values,
      onSuccess: () => formikBag.setSubmitting(false),
      onFailure: () => formikBag.setSubmitting(false),
    };

    dispatch(login(payload));
  }
  return (
    <Formik
      render={LoginForm}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    />
  );
}
