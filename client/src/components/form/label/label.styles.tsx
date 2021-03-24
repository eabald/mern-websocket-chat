import styled from 'styled-components';

export const LabelWrapper = styled.label`
  display: block;
  padding-bottom: 10px;
  font-family: ${(props) => props.theme.font};
  color: ${props => props.theme.mainTextColor};
`;
