import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

function SettingsPage(props) {
  const { user, dispatch, settings } = props;
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

SettingsPage.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: getUser(state),
  settings: getSettings(state),
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
