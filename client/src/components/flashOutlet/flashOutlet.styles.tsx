import styled from 'styled-components';

export const FlashOutletWrapper = styled.div`
  position: fixed;
  top: 100px;
  width: 70%;
  z-index: ${props => props.theme.zIndexes.flash};
  padding: 0 15%;
  @media only screen and (max-width: 768px) {
    width: calc(100vw - 20px);
    padding: 0;
    left: 10px;
  }
`;
