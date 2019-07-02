import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'formik';
import { TextField, FormActions, ErrorMessage } from '../../../components/Form';
import SVG from '../../../components/SVG';
import Button from '../../../components/Button';

export default function ResetPasswordForm(props) {
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
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <SVG name='spinner' size='25' color='#fff' />
          ) : (
            'Change my Password'
          )}
        </Button>
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
