import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const RoomsListWrapper = styled.ul`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.mainTextColor};
  font-family: ${props => props.theme.font};
  max-height: calc(50% - 50px);
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.scrollBackground};
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: ${props => props.theme.scrollBackground};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${props => props.theme.accentsBackground};
  }
`;

interface LiProps {
  active?: boolean | null,
}

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
    box-shadow: inset 0px 0px 10px 1px ${props => props.theme.mainTextColor};
  }
`;

export const RoomsListItem = styled.li`
  ${li}
  &:before {
    content: '#';
  }
`;

export const RoomsListItemAdd = styled(Link)`
  ${li}
  color: ${props => props.theme.mainTextColor};
  display: block;
  &:before {
    content: '+';
  }
`;
