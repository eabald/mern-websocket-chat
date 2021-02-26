import styled from 'styled-components';
import { Field } from 'formik';

export const FormFieldElement = styled(Field)`
  display: block;
  appearance: none;
  width: 100%;
  font-family: ${props => props.theme.font};
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  padding: 10px 0;
  margin-top: 5px;
  border: 0;
  border-radius: 5px;
`;
