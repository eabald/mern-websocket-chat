import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkButtonWrapper = styled(Link)`
  display: ${props => props.type};
  width: 100%;
  font-family: ${props => props.theme.font};
  text-transform: uppercase;
  background: ${props => props.theme.accentsBackground};
  color: ${props => props.theme.mainTextColor};
  text-decoration: none;
  text-align: center;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  &:hover {
    background: ${props => props.theme.secondaryTextColor};
    color: ${props => props.theme.white};
    text-decoration: underline;
  }
`
