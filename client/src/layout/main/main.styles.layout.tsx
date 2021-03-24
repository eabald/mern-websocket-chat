import styled from 'styled-components';

export const MainLayoutWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${props => props.theme.mainBackground};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    position: absolute;
    width: 200%;
    height: 200%;
    content: '';
    background: ${props => props.theme.accentsBackground};
    transform: skewY(45deg) translateY(-30%);
  }
`;

export const MainLayoutBox = styled.div`
  z-index: 1;
  min-width: 33%;
`;
