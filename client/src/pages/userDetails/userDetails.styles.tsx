import styled from 'styled-components';

export const UserDetailsWrapper = styled.div``;

export const UserDetailsItemWrapper = styled.div`
  display: block;
  margin-bottom: 10px;
`;

export const UserDetailsLabel = styled.span`
  padding-bottom: 10px;
  padding-right: 10px;
  font-family: ${(props) => props.theme.font};
  color: ${props => props.theme.mainTextColor};
`;

export const UserDetailsText = styled.span`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.mainTextColor};
`
