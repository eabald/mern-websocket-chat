import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const DmsListWrapper = styled.ul`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  color: #ced7ff;
  font-family: ${props => props.theme.font};
  max-height: calc(50% - 50px);
  overflow-y: auto;
`;

interface LiProps {
  active?: boolean | null,
};

const li = css<LiProps>`
  padding: 5px;
  padding-left: 10px;
  cursor: pointer;
  text-decoration: ${props => props.active ? 'underline' : 'none'};
  &:before {
    padding-right: 10px;
    text-decoration: none;
    display:inline-block;
  }
  &:hover {
    box-shadow: inset 0px 0px 10px 1px #ced7ff;
  }
`;

export const DmsListItem = styled.li<LiProps>`
  ${li}
  &:before {
    content: '#';
  }
`;

export const DmsListItemAdd = styled(Link)`
  ${li}
  color: #ced7ff;
  display: block;
  &:before {
    content: '+';
  }
`;
