import styled from 'styled-components';

export const TermsAndConditionsWrapper = styled.div`
  background: #2e2e2e;
  border-radius: 5px;
  padding: 20px;
  max-width: 1100px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #5a5a5a;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #5a5a5a;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #4759a8;
  }
`;
