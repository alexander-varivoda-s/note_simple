import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'formik';
import { TextField, FormActions, ErrorMessage } from '../../../components/Form';
import SVG from '../../../components/SVG';
import Button from '../../../components/Button';

export default function RegisterForm(props) {
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
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <SVG name='spinner' size='25' color='#fff' />
          ) : (
            'Sing up'
          )}
        </Button>
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
