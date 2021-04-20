import styled from 'styled-components';

export const FreepikInfoWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background: #929292;
  border-top-left-radius: 3px;
  padding: 3px;
  color: #cecece;
`;

export const FreepikInfoLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.accentsBackground};
  &:hover {
    color: ${props => props.theme.secondaryTextColor};
    text-decoration: underline;
  }
`;
