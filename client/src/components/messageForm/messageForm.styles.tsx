import styled from 'styled-components';


export const MessageFormWrapper = styled.div`
  display: block;
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  padding: 5px;
  form {
    height: 100%;
    display: flex;
    position: relative;
  }
`;

export const MessageFromEmojiPicker = styled.div`
  position: absolute;
  bottom: 100%;
  right: calc(5% - 15px);
  @media only screen and (max-width: 768px) {
    right: calc((100% - 338px) / 2);
  }
  .emoji-mart {
    background: ${props => props.theme.navBackground};
  }
  .emoji-mart-category-label {
    span {
      background: ${props => props.theme.navBackground};
    }
  }
  .emoji-mart-scroll {
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
  }
`;

export const MessageFromEmojiPickerTrigger = styled.div`
  position: absolute;
  top: 5px;
  right: calc(5% - 5px);
  color: ${(props) => props.theme.navTextColor};
  cursor: pointer;
  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${props => props.theme.zIndexes.main};
    background: transparent;
  }
  &:hover {
    color: ${(props) => props.theme.navBackground};
  }
  @media only screen and (max-width: 768px) {
    right: calc(20% - 5px);
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
  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;

export const MessageFormSubmit = styled.button`
  appearance: none;
  width: calc(5% - 10px);
  font-family: ${props => props.theme.font};
  text-transform: uppercase;
  background: ${props => props.theme.messageSubmitButtonBackGround};
  color: ${props => props.theme.mainTextColor};
  text-decoration: none;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  border: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  @media only screen and (max-width: 768px) {
    width: calc(20% - 10px);
  }
  &:hover {
    background: ${props => props.theme.secondaryTextColor};
    color: ${props => props.theme.white};
    text-decoration: underline;
  }
  &:disabled {
    cursor: not-allowed;
    background: ${props => props.theme.messageSubmitButtonBackGroundDisabled};
    color: ${props => props.theme.disabled};
  }
`;
