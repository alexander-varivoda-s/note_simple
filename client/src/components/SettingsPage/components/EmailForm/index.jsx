import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { object, string, ref } from 'yup';

import { FieldContainer, StyledErrorMessage } from '../../styles';
import Button from '../../../Shared/components/Button';
import { updateEmailAction } from '../../action';

const initialValues = {
  email: '',
  confirmEmail: '',
  password: '',
};

const validationSchema = object().shape({
  email: string()
    .email('Email is not valid!')
    .required('Email is required!'),
  confirmEmail: string()
    .oneOf([ref('email')], "Emails don't match!")
    .required('Email confirmation is required!'),
  password: string()
    .min(6, 'Password too short, has to be at least 6 characters long!')
    .required('Password is required!'),
});

function EmailForm(props) {
  const { errors, isSubmitting, touched } = props;

  return (
    <Form>
      <FieldContainer error={errors.email && touched.email}>
        <label htmlFor='email'>New email address</label>
        <Field type='text' name='email' />
        <StyledErrorMessage name='email' component='div' />
      </FieldContainer>
      <FieldContainer error={errors.confirmEmail && touched.confirmEmail}>
        <label htmlFor='confirmEmail'>Confirm email address</label>
        <Field type='text' name='confirmEmail' />
        <StyledErrorMessage name='confirmEmail' component='div' />
      </FieldContainer>
      <FieldContainer error={errors.password && touched.password}>
        <label htmlFor='password'>Password</label>
        <Field type='password' name='password' id='password' />
        <StyledErrorMessage name='password' component='div' />
      </FieldContainer>
      <div>
        <Button type='submit' submit disabled={isSubmitting}>
          Change email
        </Button>
      </div>
    </Form>
  );
}

EmailForm.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    confirmEmail: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    confirmEmail: PropTypes.bool,
    password: PropTypes.bool,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const submitHandler = dispatch => ({ email, password }, formikBag) => {
  const reset = () => formikBag.resetForm(initialValues);
  dispatch(updateEmailAction(email, password, reset, reset));
};

export default function EmailFormContainer() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler(dispatch)}
      render={EmailForm}
    />
  );
}
