import styled from 'styled-components';

export const HomeWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-rows: 50px calc(85% - 50px ) 15%;
  grid-template-areas:
    'nav nav'
    'side main'
    'side input';
`
export const HomeNavArea = styled.div`
  grid-area: nav;
`
export const HomeSideArea = styled.div`
  grid-area: side;
`
export const HomeMainArea = styled.div`
  grid-area: main;
`
export const HomeInputArea = styled.div`
  grid-area: input;
`
