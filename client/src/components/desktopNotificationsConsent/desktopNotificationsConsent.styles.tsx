import styled from 'styled-components';

export const DesktopNotificationsConsentWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: calc(50% - 150px);
  width: 300px;
  padding: 20px;
  background: ${props => props.theme.modalBackground};
`;

export const DesktopNotificationsConsentButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const DesktopNotificationsConsentButton = styled.button`
  display: inline;
  appearance: none;
  font-family: ${props => props.theme.font};
  text-transform: uppercase;
  background: ${props => props.theme.accentsBackground};
  color: ${props => props.theme.mainTextColor};
  text-decoration: none;
  text-align: center;
  padding: 10px;
  margin: 5px;
  border: 0;
  border-radius: 5px;
  &:hover {
    background: ${props => props.theme.secondaryTextColor};
    color: ${props => props.theme.white};
    text-decoration: underline;
  }
`

export const DesktopNotificationsConsentCheckboxLabel = styled.label`
  margin-top: 10px;
  font-family: ${(props) => props.theme.font};
  color: ${props => props.theme.mainTextColor};
`
