import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  background: ${props => props.theme.modalBackground};
  border-radius: 5px;
  padding: 20px;
  max-width: 1100px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
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
