import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledModified = styled.div`
  font-size: 0.875rem;
  padding: 0 1.429em;

  p {
    color: gray;
    margin: 0.8em 0;
  }
`;

export default function Modified(props) {
  const { date } = props;

  const dateString = new Date(date).toLocaleString('en-US', {
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <StyledModified>
      <div>Modified</div>
      <p>{dateString}</p>
    </StyledModified>
  );
}

Modified.propTypes = {
  date: PropTypes.string.isRequired,
};
