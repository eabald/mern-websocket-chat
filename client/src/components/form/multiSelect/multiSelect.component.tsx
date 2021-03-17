// React
import React from 'react';
// External
import { useField } from 'formik';
import { OptionTypeBase } from 'react-select';
import AsyncSelect from 'react-select/async';
// Styled
import { MultiSelectWrapper } from './multiSelect.styles';
// Components
import FormGroup from '../formGroup/formGroup.component';
import Label from '../label/label.component';

const MultiSelect:React.FC<any> = ({ label, loadOptions, errorInfo, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  return (
    <FormGroup>
      <Label htmlFor={field.name}>{label}</Label>
      <MultiSelectWrapper>
        <AsyncSelect
          loadOptions={loadOptions}
          cacheOptions={true}
          name={field.name}
          isMulti={true}
          onChange={(options: OptionTypeBase) => setValue(options)}
          instanceId={props.iid}
        />
      </MultiSelectWrapper>
      {errorInfo}
    </FormGroup>
  )
}
export default MultiSelect;
