// external
import * as Yup from 'yup';

const LoginFormValidationSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default LoginFormValidationSchema;
