import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkButtonWrapper = styled(Link)`
  display: ${props => props.type};
  width: 100%;
  font-family: ${props => props.theme.font};
  text-transform: uppercase;
  background: #4759a8;
  color: #ced7ff;
  text-decoration: none;
  text-align: center;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  &:hover {
    background: #5a6fca;
    color: #ffffff;
    text-decoration: underline;
  }
`
