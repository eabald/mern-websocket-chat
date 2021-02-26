import styled from 'styled-components';

export const FreepikInfoWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: #929292;
  border-top-left-radius: 3px;
  padding: 3px;
  color: #cecece;
`;

export const FreepikInfoLink = styled.a`
  text-decoration: none;
  color: #4759a8;
  &:hover {
    color: #5a6fca;
    text-decoration: underline;
  }
`;
