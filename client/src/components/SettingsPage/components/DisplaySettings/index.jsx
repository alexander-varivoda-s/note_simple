import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  SettingsSection,
  SectionTitle,
  Setting,
  SettingContent,
} from '../../styles';
import SettingHeader from '../SettingHeader';
import SelectField from '../SelectField';
import CheckboxField from '../CheckboxField';
import { updateSettingsAction } from '../../actions';
import { getSettings } from '../../selectors';

function DisplaySettings() {
  const settings = useSelector(getSettings);

  const dispatch = useDispatch();

  const [isSortingSettingsOpen, setSortingSettingsOpen] = useState(false);
  const [isPreviewLinesSettingsOpen, setPreviewLinesSettingsOpen] = useState(
    false
  );
  const [isTabKeyBehaviorOpen, setTabKeyBehaviorOpen] = useState(false);

  function handleSortingClick() {
    setSortingSettingsOpen(!isSortingSettingsOpen);
  }

  function handlePreviewLinesClick() {
    setPreviewLinesSettingsOpen(!isPreviewLinesSettingsOpen);
  }

  function handleTabKeyBehaviorClick() {
    setTabKeyBehaviorOpen(!isTabKeyBehaviorOpen);
  }

  function handleSortByChange(e) {
    const { value } = e.target;
    dispatch(
      updateSettingsAction({
        ...settings,
        sorting: {
          ...settings.sorting,
          by: value,
        },
      })
    );
  }

  function handleSortOrderChange(e) {
    const { value } = e.target;
    dispatch(
      updateSettingsAction({
        ...settings,
        sorting: {
          ...settings.sorting,
          order: value,
        },
      })
    );
  }

  function handlePreviewLinesChange(e) {
    const { value } = e.target;
    dispatch(
      updateSettingsAction({
        ...settings,
        previewLines: parseInt(value, 10),
      })
    );
  }

  function handleTabKeyBehaviorChange(e) {
    const { checked } = e.target;
    dispatch(
      updateSettingsAction({
        ...settings,
        tabKeyBehavior: checked,
      })
    );
  }

  const sortBy = [
    ['modified', 'Modified'],
    ['alphabet', 'Alphabetically'],
    ['created', 'Last created'],
  ];

  const sortOrder = [['desc', 'Descending'], ['asc', 'Ascending']];

  return (
    <SettingsSection>
      <SectionTitle>Display</SectionTitle>
      <Setting>
        <SettingHeader
          title='Sorting'
          isOpen={isSortingSettingsOpen}
          clickHandler={handleSortingClick}
        />
        {!isSortingSettingsOpen ? (
          <SettingContent>
            <span>How your notes are ordered</span>
            <span>{`${settings.sorting.by}, ${settings.sorting.order}`}</span>
          </SettingContent>
        ) : (
          <SettingContent>
            <span>How your notes are ordered</span>
            <SelectField
              items={sortBy}
              defaultValue={settings.sorting.by}
              label='Sort By'
              name='sort-by'
              onChange={handleSortByChange}
            />
            <SelectField
              items={sortOrder}
              defaultValue={settings.sorting.order}
              label='In This Order'
              name='order-by'
              onChange={handleSortOrderChange}
            />
          </SettingContent>
        )}
      </Setting>
      <Setting>
        <SettingHeader
          title='Preview Lines'
          isOpen={isPreviewLinesSettingsOpen}
          clickHandler={handlePreviewLinesClick}
        />
        {!isPreviewLinesSettingsOpen ? (
          <SettingContent>
            <span>Preview lines for each note to show in the side</span>
            <span>{settings.previewLines}</span>
          </SettingContent>
        ) : (
          <SettingContent>
            <span>
              Number of preview lines of each note to show in the side of the
              web app, besides the title or first line.
            </span>
            <SelectField
              items={[...Array(5).keys()]}
              defaultValue={settings.previewLines}
              label='Lines'
              name='lines'
              onChange={handlePreviewLinesChange}
            />
          </SettingContent>
        )}
      </Setting>
      <Setting>
        <SettingHeader
          title='Tab key behavior'
          isOpen={isTabKeyBehaviorOpen}
          clickHandler={handleTabKeyBehaviorClick}
        />
        {!isTabKeyBehaviorOpen ? (
          <SettingContent>
            <span>Support for using the tab key to indent text</span>
            <span>{settings.tabKeyBehavior ? 'Enabled' : 'Disabled'}</span>
          </SettingContent>
        ) : (
          <SettingContent>
            <span>
              Number of preview lines of each note to show in the side of the
              web app, besides the title or first line.
            </span>
            <CheckboxField
              label='Enable'
              fieldLabel='Tab to indent'
              name='tab-key-behavior'
              checked={settings.tabKeyBehavior}
              onChange={handleTabKeyBehaviorChange}
            />
          </SettingContent>
        )}
      </Setting>
    </SettingsSection>
  );
}

export default DisplaySettings;
