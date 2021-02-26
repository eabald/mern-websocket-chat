import React from 'react';
import { FormFieldElement } from './formField.styles';

type FormFieldProps = {
  id: string;
  name: string;
  placeholder?: string;
  type: string;
};

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  placeholder,
  type,
}) => (
  <FormFieldElement id={id} name={name} placeholder={placeholder} type={type} />
);
export default FormField;
