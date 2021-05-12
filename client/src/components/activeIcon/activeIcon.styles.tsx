import styled from 'styled-components';

export const ActiveIconWrapper = styled.span`
  display: inline-flex;
  height: 18px;
  width: 18px;
  justify-content: center;
  align-items: center;
`;

export const ActiveIconContent = styled.span`
  height: 10px;
  width: 10px;
  background: ${props => props.theme.activeIcon};
  border-radius: 50%;
  box-shadow: inset 0 0 4px ${props => props.theme.loaderBackground}, 0 0 10px ${props => props.theme.activeShadow};
`;
