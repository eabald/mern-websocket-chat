import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
  color: #ced7ff;
  font-family: ${props => props.theme.font};
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapperWindow = styled.div`
  position: relative;
  width: 50%;
  height: auto;
  background: #2e2e2e;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 2px 1px rgb(150 150 150 / 50%);
`

export const ModalWrapperClose = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
  }
`;

export const ModalWrapperTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  border-bottom: solid 1px #ced7ff;
  padding-bottom: 10px;
`;

export const ModalWrapperContent = styled.div`
  padding: 10px 0;
`;
