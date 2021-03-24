import styled from 'styled-components';

export const SubmitButtonElement = styled.button`
  display: block;
  appearance: none;
  width: 100%;
  font-family: ${props => props.theme.font};
  text-transform: uppercase;
  background: ${props => props.theme.accentsBackground};
  color: ${props => props.theme.mainTextColor};
  text-decoration: none;
  text-align: center;
  padding: 10px;
  margin: 20px 0 10px;
  border: 0;
  border-radius: 5px;
  &:hover {
    background: ${props => props.theme.secondaryTextColor};
    color: ${props => props.theme.white};
    text-decoration: underline;
  }
  &:disabled {
    cursor: not-allowed;
    background: ${props => props.theme.disabledBackground};
    color: ${props => props.theme.disabled};
    text-decoration: none;
  }
`
