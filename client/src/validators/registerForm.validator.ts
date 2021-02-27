import * as Yup from 'yup';

const RegisterFormValidationSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  firstName: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  lastName: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  username: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default RegisterFormValidationSchema;
