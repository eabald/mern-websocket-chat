// external
import * as Yup from 'yup';

const CreateRoomValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  users: Yup.array().of(Yup.string()).min(1).required('Required'),
});

export default CreateRoomValidationSchema;
