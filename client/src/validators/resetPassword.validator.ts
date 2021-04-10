// external
import * as Yup from 'yup';

const ResetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export default ResetPasswordValidationSchema;
