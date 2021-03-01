import styled from 'styled-components';

export const UsersListWrapper = styled.ul`
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
  active: boolean,
};

export const UsersListItem = styled.li<LiProps>`
  padding: 5px;
  padding-left: 10px;
  cursor: pointer;
  text-decoration: ${props => props.active ? 'underline' : 'none'};
  &:before {
    content: '#';
    padding-right: 10px;
    text-decoration: none;
    display:inline-block;
  }
  &:hover {
    box-shadow: inset 0px 0px 10px 1px #ced7ff;
  }
`;
