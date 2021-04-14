// external
import * as Yup from 'yup';
import setup from 'yup-password'

setup(Yup);

const ChangePasswordValidationSchema = Yup.object().shape({
  password: Yup.string().password().required('Required'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});

export default ChangePasswordValidationSchema;
