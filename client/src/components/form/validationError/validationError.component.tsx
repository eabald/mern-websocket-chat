// React
import React from 'react';
// Styled
import { ValidationErrorWrapper } from './validationError.styles';

type ValidationErrorProps = {
  children: string,
};

const ValidationError:React.FC<ValidationErrorProps> = ({ children }) => (
  <ValidationErrorWrapper>{children}</ValidationErrorWrapper>
)
export default ValidationError;
