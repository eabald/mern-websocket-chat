// React
import React, { ReactNode } from 'react';
// Styled
import { FormGroupWrapper } from './formGroup.styles';

type FormGroupProps = {
  children: ReactNode;
};

const FormGroup: React.FC<FormGroupProps> = ({ children }) => (
  <FormGroupWrapper>{children}</FormGroupWrapper>
);

export default FormGroup;
