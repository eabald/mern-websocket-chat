import styled from 'styled-components';

export const AuthLayoutWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #5a5a5a;
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
    background: #4759a8;
    transform: skewY(45deg) translateY(-30%);
  }
`;

export const AuthLayoutBox = styled.div`
  z-index: 1;
  min-width: 33%;
`;
