// external
import * as Yup from 'yup';

const BuyRegistrationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
});

export default BuyRegistrationSchema;
