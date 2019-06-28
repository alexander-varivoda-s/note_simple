import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  SettingsSection,
  SectionTitle,
  Setting,
  SettingContent,
} from '../../styles';
import SettingHeader from '../SettingHeader';
import EmailForm from '../EmailForm';
import DeleteAccountForm from '../DeleteAccountForm';
import PasswordForm from '../PasswordForm';

export default function AccountSettings(props) {
  const { user } = props;

  const [isEmailSettingOpen, setEmailSettingOpen] = useState(false);
  const [isPasswordSettingOpen, setPasswordSettingOpen] = useState(false);
  const [isDeleteAccountSettingOpen, setDeleteAccountSettingOpen] = useState(
    false
  );

  function handleEmailToggleClick() {
    setEmailSettingOpen(!isEmailSettingOpen);
  }

  function handlePasswordToggleClick() {
    setPasswordSettingOpen(!isPasswordSettingOpen);
  }

  function handleDeleteAccountToggleClick() {
    setDeleteAccountSettingOpen(!isDeleteAccountSettingOpen);
  }

  return (
    <SettingsSection>
      <SectionTitle>Account</SectionTitle>
      <Setting>
        <SettingHeader
          title='Email Address'
          isOpen={isEmailSettingOpen}
          clickHandler={handleEmailToggleClick}
        />
        {!isEmailSettingOpen ? (
          <SettingContent>
            <span>The email address you use to sign in</span>
            <span>{user.email}</span>
          </SettingContent>
        ) : (
          <SettingContent>
            <span>A confirmation email will be sent to your new address.</span>
            <div>
              <EmailForm />
            </div>
          </SettingContent>
        )}
      </Setting>
      <Setting>
        <SettingHeader
          title='Password'
          isOpen={isPasswordSettingOpen}
          clickHandler={handlePasswordToggleClick}
        />
        {!isPasswordSettingOpen ? (
          <SettingContent>
            <span>What you use to sign in</span>
            <span>••••••••</span>
          </SettingContent>
        ) : (
          <SettingContent>
            <span>Your new password should be at least 6 characters long.</span>
            <div>
              <PasswordForm />
            </div>
          </SettingContent>
        )}
      </Setting>
      <Setting>
        <SettingHeader
          title='Delete Account'
          isOpen={isDeleteAccountSettingOpen}
          clickHandler={handleDeleteAccountToggleClick}
        />
        {!isDeleteAccountSettingOpen ? (
          <SettingContent>
            <span>Delete your account and notes</span>
          </SettingContent>
        ) : (
          <SettingContent>
            <span>
              Enter your password to confirm the permanent deletion of your
              account and notes.
            </span>
            <div>
              <DeleteAccountForm />
            </div>
          </SettingContent>
        )}
      </Setting>
    </SettingsSection>
  );
}

AccountSettings.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};
