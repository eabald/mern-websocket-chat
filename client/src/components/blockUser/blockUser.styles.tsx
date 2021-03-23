import styled from 'styled-components';

export const BlockUserWrapper = styled.div`
  display: block;
  margin-bottom: 10px;
`;

export const BlockUserButton = styled.button`
  display: block;
  appearance: none;
  width: 100%;
  font-family: ${props => props.theme.font};
  text-transform: uppercase;
  background: #4759a8;
  color: #ced7ff;
  text-decoration: none;
  text-align: center;
  padding: 10px;
  margin: 20px 0 10px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #5a6fca;
    color: #ffffff;
    text-decoration: underline;
  }
  &:disabled {
    cursor: not-allowed;
    background: #788ce4;
    color: #b6b6b6;
    text-decoration: none;
  }
`;

export const BlockUserButtonText = styled.span`
  padding-left: 10px;
`;
