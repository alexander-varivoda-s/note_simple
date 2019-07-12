import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'formik';
import {
  TextField,
  FormActions,
  ErrorMessage,
} from '../../Shared/components/Form';
import SVG from '../../Shared/components/SVG';
import Button from '../../Shared/components/Button';

export default function ForgotPasswordForm(props) {
  const { isSubmitting, errors } = props;

  return (
    <Form>
      <Field type='email' name='email' label='Email' component={TextField} />
      {errors.formSubmission && (
        <ErrorMessage>{errors.formSubmission}</ErrorMessage>
      )}
      <FormActions>
        <Button type='submit' submit disabled={isSubmitting}>
          {isSubmitting ? (
            <SVG name='spinner' size='25' color='#fff' />
          ) : (
            'Remind Me'
          )}
        </Button>
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
