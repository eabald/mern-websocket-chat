import styled from 'styled-components';

export const MessagesOutletWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${props => props.theme.scrollBackground};
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: ${props => props.theme.scrollBackground};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${props => props.theme.accentsBackground};
  }
`;
