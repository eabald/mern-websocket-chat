// external
import * as Yup from 'yup';
import setup from 'yup-password'

setup(Yup);

const RegisterFormValidationSchema = Yup.object().shape({
  password: Yup.string().password().required('Required'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
  firstName: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  lastName: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  username: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
});

export default RegisterFormValidationSchema;
