import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { object, string, ref } from 'yup';

import { FieldContainer } from '../../styles';
import { PrimaryButton } from '../../../Shared/components/Button';
import { updatePasswordAction } from '../../actions';

const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const validationSchema = object().shape({
  oldPassword: string().required('Old password is required!'),
  newPassword: string()
    .min(6, 'Password too short, has to be at least 6 characters long!')
    .required('New password is required!'),
  confirmPassword: string()
    .oneOf([ref('newPassword')], "Passwords don't match!")
    .required('Password confirmation is required!'),
});

function PasswordForm(props) {
  const { errors, isSubmitting, touched } = props;

  return (
    <Form>
      <FieldContainer error={errors.oldPassword && touched.oldPassword}>
        <label htmlFor='oldPassword'>Old password</label>
        <Field type='password' name='oldPassword' />
        <ErrorMessage name='oldPassword' component='div' />
      </FieldContainer>
      <FieldContainer error={errors.newPassword && touched.newPassword}>
        <label htmlFor='newPassword'>New password</label>
        <Field type='password' name='newPassword' />
        <ErrorMessage name='newPassword' component='div' />
      </FieldContainer>
      <FieldContainer error={errors.confirmPassword && touched.confirmPassword}>
        <label htmlFor='confirmPassword'>Confirm password</label>
        <Field type='password' name='confirmPassword' />
        <ErrorMessage name='confirmPassword' component='div' />
      </FieldContainer>
      <div>
        <PrimaryButton type='submit' compact disabled={isSubmitting}>
          Change password
        </PrimaryButton>
      </div>
    </Form>
  );
}

PasswordForm.propTypes = {
  errors: PropTypes.shape({
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    oldPassword: PropTypes.bool,
    newPassword: PropTypes.bool,
    confirmPassword: PropTypes.bool,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const submitHandler = dispatch => ({ oldPassword, newPassword }, formikBag) => {
  const reset = () => formikBag.resetForm(initialValues);
  dispatch(updatePasswordAction(oldPassword, newPassword, reset, reset));
};

export default function PasswordFormContainer() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler(dispatch)}
      render={PasswordForm}
    />
  );
}
