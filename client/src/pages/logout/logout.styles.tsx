import styled from 'styled-components';
import { ReactComponent as HelloSvg } from '../../images/hello.svg';

export const LogoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 50% 50%;
  grid-template-areas:
    'img info'
    'img link';
  background: #2e2e2e;
  border-radius: 5px;
  padding: 20px;
`;

export const LogoutImageWrapper = styled.div`
  grid-area: img;
  padding: 30px;
`;

export const LogoutImage = styled(HelloSvg)`
  height: 100%;
  width: auto;
  max-height: 250px;
`;

export const LogoutTextWrapper = styled.div`
  grid-area: info;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const LogoutLinkWrapper = styled.div`
  grid-area: link;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
