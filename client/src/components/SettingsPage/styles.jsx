import styled from 'styled-components';
import { ErrorMessage } from 'formik';

export const SettingsSection = styled.section`
  color: #666;
`;

export const SectionTitle = styled.h1`
  font-size: 1.875em;
  font-weight: 100;
  text-align: left;
  margin: 0 0 1em;
`;

export const Setting = styled.div``;

export const SettingContent = styled.div`
  font-size: 0.875rem;
  margin: 0 0 1.786em;

  span {
    display: inline-block;
    &:last-of-type:not(:first-of-type) {
      float: right;
    }
  }

  form {
    margin: 1.429em auto 0;
    max-width: 21.429em;
  }
`;

export const FieldContainer = styled.div`
  & + * {
    margin-top: 1em;
  }
  position: relative;

  input[type='text'],
  input[type='password'],
  input[type='email'] {
    border-color: ${props => (props.error ? 'red' : '#eee')};
    border-style: solid;
    font-family: ${({ theme }) => theme.font};
    font-size: 1rem;
    min-height: 2em;
    outline: none;
    padding: 0 0.4em;
    width: 100%;
  }

  input[type='checkbox'] {
    width: auto;
  }
`;

export const SelectContainer = styled(FieldContainer)`
  display: flex;
  justify-content: space-between;
  margin: 1em auto;
  width: 80%;
`;

export const CheckboxContainer = styled(FieldContainer)`
  margin: 1em auto;
  width: 80%;
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
`;

export const SettingsContainer = styled.div`
  margin: 10em auto 2em;
  width: 20em;

  @media (min-width: 320px) {
    margin-top: 2em;
  }

  @media (min-width: 768px) {
    margin-top: 10em;
  }
`;
