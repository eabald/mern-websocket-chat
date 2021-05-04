import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${props => props.theme.zIndexes.flash};
  color: ${props => props.theme.mainTextColor};
  font-family: ${props => props.theme.font};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapperWindow = styled.div`
  position: relative;
  width: 50%;
  height: auto;
  background: ${props => props.theme.modalBackground};
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 2px 1px rgb(150 150 150 / 50%);
  min-width: 33%;
  max-width: 95%;
  z-index: ${props => props.theme.zIndexes.main};
  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`

export const ModalWrapperClose = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.white};
  }
`;

export const ModalWrapperTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  border-bottom: solid 1px ${props => props.theme.mainTextColor};
  padding-bottom: 10px;
`;

export const ModalWrapperContent = styled.div`
  padding: 10px 0;
`;
