import styled from 'styled-components';

export const TextBlockElement = styled.p`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.mainTextColor};
  padding-bottom: 10px;
`
