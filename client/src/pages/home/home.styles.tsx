import styled from 'styled-components';

export const HomeWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 50px calc(85% - 50px ) 15%;
  grid-template-areas:
    'nav nav'
    'side main'
    'side input';
  @media only screen and (max-width: 910px) {
    display: block;
  }
`
export const HomeNavArea = styled.div`
  grid-area: nav;
  @media only screen and (max-width: 910px) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
`
export const HomeSideArea = styled.div`
  grid-area: side;
  border-right: solid 1px ${props => props.theme.black};
  @media only screen and (max-width: 910px) {
    position: absolute;
    top: 51px;
    bottom: 0;
    left: -100%;
    transition: left 0.5s ease-in;
    z-index: ${props => props.theme.zIndexes.main};
    background: ${props => props.theme.mainBackground};
    &.is-open {
      left: 0;
    }
  }
`
export const HomeMainArea = styled.div`
  grid-area: main;
  @media only screen and (max-width: 910px) {
    height: calc(80% - 51px);
    position: absolute;
    top: 51px;
    right: 0;
    left: 0;
  }
`
export const HomeInputArea = styled.div`
  grid-area: input;
  border-top: solid 1px ${props => props.theme.black};
  height: 100%;
  @media only screen and (max-width: 910px) {
    height: 20%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
`
