import styled from 'styled-components';

export const InviteNewUserContent = styled.div`
  background: ${props => props.theme.modalBackground};
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 2px 1px rgb(150 150 150 / 50%);
  width: 50%;
  margin: auto;
  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;
