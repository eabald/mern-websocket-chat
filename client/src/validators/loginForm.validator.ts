// external
import * as Yup from 'yup';

const LoginFormValidationSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
});

export default LoginFormValidationSchema;
