// external
import * as Yup from 'yup';

const InviteNewUserSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export default InviteNewUserSchema;
