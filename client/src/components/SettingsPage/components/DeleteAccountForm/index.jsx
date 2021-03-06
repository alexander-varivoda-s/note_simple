import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { object, bool, string } from 'yup';

import { FieldContainer, StyledErrorMessage } from '../../styles';
import { PrimaryButton } from '../../../Shared/components/Button';
import { deleteAccount } from '../../actions';

const initialValues = {
  confirm: false,
  password: '',
};

const validationSchema = object().shape({
  confirm: bool()
    .test('confirm', 'Confirmation is required!', v => v === true)
    .required('Confirmation is required!'),
  password: string()
    .min(6, 'Password too short, has to be at least 6 characters long!')
    .required('Password is required!'),
});

function DeleteAccountForm(props) {
  const { errors, isSubmitting, touched } = props;

  return (
    <Form>
      <FieldContainer error={errors.confirm && touched.confirm}>
        <label htmlFor='confirm'>Confirm</label>
        <div>
          <Field type='checkbox' name='confirm' />
          <span>Permanently delete my account</span>
        </div>
        <StyledErrorMessage name='confirm' component='div' />
      </FieldContainer>
      <FieldContainer error={errors.password && touched.password}>
        <label htmlFor='password'>Password</label>
        <Field type='password' name='password' />
        <StyledErrorMessage name='password' component='div' />
      </FieldContainer>
      <label>
        <PrimaryButton type='submit' compact disabled={isSubmitting}>
          Delete account
        </PrimaryButton>
      </label>
    </Form>
  );
}

DeleteAccountForm.propTypes = {
  errors: PropTypes.shape({
    confirm: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    confirm: PropTypes.bool,
    password: PropTypes.bool,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const submitHandler = dispatch => ({ password }, formikBag) => {
  const reset = () => formikBag.resetForm(initialValues);
  const payload = {
    params: {
      password,
    },
    onSuccess: reset,
    onFailure: reset,
  };
  console.log(payload);
  dispatch(deleteAccount(payload));
};

export default function DeleteAccountFormContainer() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler(dispatch)}
      render={DeleteAccountForm}
    />
  );
}
