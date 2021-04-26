import styled from 'styled-components';
import { ReactComponent as CrySvg } from '../../images/crying.svg';

export const ErrorBoundaryWrapper = styled.div`
  background: ${props => props.theme.modalBackground};
  border-radius: 5px;
  padding: 20px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  grid-template-areas:
    'img info'
    'img subinfo';
`;

export const ErrorBoundaryImageWrapper = styled.div`
  grid-area: img;
  padding: 30px;
`;

export const ErrorBoundaryImage = styled(CrySvg)`
  height: 100%;
  width: auto;
  max-height: 250px;
`;

export const ErrorBoundaryTextWrapper = styled.div`
  grid-area: info;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const ErrorBoundaryInfoWrapper = styled.div`
  grid-area: subinfo;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
