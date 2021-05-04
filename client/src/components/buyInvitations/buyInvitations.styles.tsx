import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BuyInvitationWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BuyInvitationBox = styled.div`
  z-index: ${props => props.theme.zIndexes.modalPopup};
  background: ${props => props.theme.modalBackground};
  width: 60%;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 2px 1px rgb(150 150 150 / 50%);
  position: relative;
`;

export const BuyInvitationCloseWrapper = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: ${props => props.theme.mainTextColor};
  &:hover {
    color: ${props => props.theme.white};
  }
`;

export const BuyInvitationButton = styled.button`
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
  cursor: pointer;
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
`;
