import React from 'react';
import { ValidationErrorWrapper } from './validationError.styles';

type ValidationErrorProps = {
  children: string,
};

const ValidationError:React.FC<ValidationErrorProps> = ({ children }) => (
  <ValidationErrorWrapper>{children}</ValidationErrorWrapper>
)
export default ValidationError;
