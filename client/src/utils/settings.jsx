export function saveAppSettings(settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
}

export function getAppSettings() {
  let settings = null;

  try {
    settings = JSON.parse(localStorage.getItem('settings'));
  } catch (e) {
    console.error('Failed to parse app settings json.');
  }

  return settings;
}

export function resetAppSettings() {
  localStorage.removeItem('settings');
}
