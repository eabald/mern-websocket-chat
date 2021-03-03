// external
import * as Yup from 'yup';

const MessageFormValidationSchema = Yup.object().shape({
  msg: Yup.string().required('Required'),
});

export default MessageFormValidationSchema;
