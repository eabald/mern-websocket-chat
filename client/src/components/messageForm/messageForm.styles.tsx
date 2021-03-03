import styled from 'styled-components';

interface MessageFormWrapperProps {
  processing: boolean,
}

export const MessageFormWrapper = styled.div<MessageFormWrapperProps>`
  display: block;
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  padding: 5px;
  /* add loading */
  form {
    height: 100%;
    display: flex;
  }
`;

export const MessageFormTextArea = styled.textarea`
  width: 95%;
  appearance: none;
  font-family: ${(props) => props.theme.font};
  padding: 5px;
  border: 0;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export const MessageFormSubmit = styled.button`
  appearance: none;
  width: calc(5% - 10px);
  font-family: ${props => props.theme.font};
  text-transform: uppercase;
  background: #4759a8;
  color: #ced7ff;
  text-decoration: none;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  border: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;