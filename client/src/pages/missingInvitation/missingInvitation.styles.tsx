import styled from 'styled-components';

import { ReactComponent as HelloSvg } from '../../images/hello.svg';

export const MissingInvitationWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 20% 80%;
  grid-template-areas:
    'img info'
    'img link';
  background: ${props => props.theme.modalBackground};
  border-radius: 5px;
  padding: 20px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 100%;
    grid-template-rows: auto;
    grid-template-areas:
      'img'
      'info'
      'link';
  }
`;

export const MissingInvitationImageWrapper = styled.div`
  grid-area: img;
  padding: 30px;
`;

export const MissingInvitationImage = styled(HelloSvg)`
  height: 100%;
  width: auto;
  max-height: 250px;
`;

export const MissingInvitationTextWrapper = styled.div`
  grid-area: info;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const MissingInvitationLinkWrapper = styled.div`
  grid-area: link;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
