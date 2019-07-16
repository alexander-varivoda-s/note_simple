import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '../Shared/components/Container';
import PageHeader from '../Shared/components/PageHeader';
import AccountDropdown from '../AccountDropdown';
import { getUser } from '../User/selectors';
import AccountSettings from './components/AccountSettings';
import DisplaySettings from './components/DisplaySettings';
import { SettingsContainer } from './styles';

export default function SettingsPage() {
  const user = useSelector(getUser);
  return (
    <Container>
      <Helmet>
        <title>Account Settings</title>
        <meta
          name='description'
          content='Simplenote is an easy way to keep notes, lists, ideas, and more.'
        />
      </Helmet>
      <PageHeader>
        <AccountDropdown
          email={user.email}
          items={[
            <Link to='/'>Back to Notes</Link>,
            <Link to='/logout'>Sign Out</Link>,
          ]}
        />
      </PageHeader>
      <SettingsContainer>
        <AccountSettings user={user} />
        <DisplaySettings />
      </SettingsContainer>
    </Container>
  );
}
