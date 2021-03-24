import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const InlineLinkElement = styled(Link)`
  display: inline;
  text-decoration: none;
  color: ${props => props.theme.accentsBackground};
  &:hover {
    color: ${props => props.theme.secondaryTextColor};
    text-decoration: underline;
  }
`;
