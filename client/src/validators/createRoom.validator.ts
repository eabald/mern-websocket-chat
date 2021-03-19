// external
import * as Yup from 'yup';

const CreateRoomValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
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

export default CreateRoomValidationSchema;
