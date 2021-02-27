import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const InlineLinkElement = styled(Link)`
  display: inline;
  text-decoration: none;
  color: #4759a8;
  &:hover {
    color: #5a6fca;
    text-decoration: underline;
  }
`;
