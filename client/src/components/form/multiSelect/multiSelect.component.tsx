// React
import React from 'react';
// External
import { useField } from 'formik';
import Select, {  OptionTypeBase } from 'react-select';
// Styled
import { MultiSelectWrapper } from './multiSelect.styles';
// Components
import FormGroup from '../formGroup/formGroup.component';
import Label from '../label/label.component';

const MultiSelect:React.FC<any> = ({ label, values, errorInfo, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  return (
    <FormGroup>
      <Label htmlFor={field.name}>{label}</Label>
      <MultiSelectWrapper>
        <Select
          options={values}
          name={field.name}
          isMulti={true}
          onChange={(options: OptionTypeBase) => setValue(options.map((option: any) => option.value))}
          instanceId={props.iid}
        />
      </MultiSelectWrapper>
      {errorInfo}
    </FormGroup>
  )
}
export default MultiSelect;
