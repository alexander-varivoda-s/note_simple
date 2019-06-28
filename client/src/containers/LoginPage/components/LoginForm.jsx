import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'formik';
import { TextField, FormActions, ErrorMessage } from '../../../components/Form';
import SVG from '../../../components/SVG';
import Button from '../../../components/Button';

const LoginForm = ({ isSubmitting, errors }) => (
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

LoginForm.propTypes = {
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

export default LoginForm;
