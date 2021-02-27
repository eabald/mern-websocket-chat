import styled from 'styled-components';
import { Field } from 'formik';

export const CheckboxField = styled(Field)``;

export const CheckboxLabel = styled.label`
  padding-bottom: 10px;
  font-family: ${(props) => props.theme.font};
  color: #ced7ff;
`;
