import React from 'react';
import { SubmitButtonElement } from './submitButton.styles';

type SubmitButtonProps = {};

const SubmitButton: React.FC<SubmitButtonProps> = () => (
  <SubmitButtonElement type='submit'>Submit</SubmitButtonElement>
);
export default SubmitButton;
