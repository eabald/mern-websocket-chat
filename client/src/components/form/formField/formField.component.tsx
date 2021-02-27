import React from 'react';
import { FormFieldElement } from './formField.styles';

type FormFieldProps = {
  id: string;
  name: string;
  placeholder?: string;
  type: string;
  error?: boolean | string;
};

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  placeholder,
  type,
  error
}) => (
  <FormFieldElement id={id} name={name} placeholder={placeholder} type={type} error={error} />
);
export default FormField;
