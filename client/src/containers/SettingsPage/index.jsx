import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '../../components/Container';
import CenteredContainer from '../../components/CenteredContainer';
import PageHeader from '../../components/PageHeader';
import AccountDropdown from '../AccountDropdown';
import { getUser } from '../User/selectors';
import AccountSettings from './components/AccountSettings';
import DisplaySettings from './components/DisplaySettings';
import { getAppSettings } from '../../utils/settings';
import { getSettings } from './selectors';

export default function SettingsPage() {
  const user = useSelector(getUser);
  const settings = useSelector(getAppSettings);

  const dispatch = useDispatch();

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
      <CenteredContainer>
        <AccountSettings user={user} />
        <DisplaySettings dispatch={dispatch} settings={settings} />
      </CenteredContainer>
    </Container>
  );
}
