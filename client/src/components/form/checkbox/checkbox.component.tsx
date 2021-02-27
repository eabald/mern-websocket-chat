import React, { ReactNode } from 'react';
import { CheckboxField, CheckboxLabel } from './checkbox.styles';
import FormGroup from '../formGroup/formGroup.component';

type CheckboxProps = {
  name: string,
  error?: boolean | string,
  children: string | ReactNode,
  errorInfo: ReactNode,
};

const Checkbox:React.FC<CheckboxProps> = ({ name, error, children, errorInfo }) => (
  <FormGroup>
    <CheckboxLabel htmlFor={name}>
      <CheckboxField id={name} name={name} type='checkbox' error={error}/>
      { children }
    </CheckboxLabel>
    {errorInfo}
  </FormGroup>
)
export default Checkbox;
