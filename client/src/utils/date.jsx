// eslint-disable-next-line import/prefer-default-export
export function getNoteHistoryDateFormat(date) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  let minutes = date.getMinutes();
  if (minutes % 10 === minutes) minutes = `0${minutes}`;

  let seconds = date.getSeconds();
  if (seconds % 10 === seconds) seconds = `0${seconds}`;

  const time = `${date.getHours()}:${minutes}:${seconds}`;
  return `${month} ${day}, ${year} ${time}`;
}
