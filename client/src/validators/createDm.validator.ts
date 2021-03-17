// external
import * as Yup from 'yup';

const CreateDmValidationSchema = Yup.object().shape({
  users: Yup.array().min(1).required('Required'),
});

export default CreateDmValidationSchema;
