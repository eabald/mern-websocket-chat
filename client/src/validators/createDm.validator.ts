// external
import * as Yup from 'yup';

const CreateDmValidationSchema = Yup.object().shape({
  users: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
        username: Yup.string(),
      })
    )
    .min(1)
    .required('Required'),
});

export default CreateDmValidationSchema;
