// React
import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { updateUserStart } from '../../redux/user/user.actions';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// Validators
import UpdateUserFormValidationSchema from '../../validators/updateUserForm.validator';
// Styled
import { ProfileWrapper } from './profile.styles';
// Components
import Modal from '../../components/modal/modal.component';
import TextBlock from '../../components/textBlock/textBlock.component';
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import ValidationError from '../../components/form/validationError/validationError.component';

type ProfileProps = {};
interface RegisterValues {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const submitHandler = async (values: RegisterValues): Promise<void> => {
    await dispatch(updateUserStart(values));
  };

  return (
      <Modal title='Profile'>
        <ProfileWrapper>
          <TextBlock>Here you can edit your profile settings.</TextBlock>
          <Formik
            initialValues={{
              _id: user?._id ?? '',
              email: user?.email ?? '',
              username: user?.username ?? '',
              firstName: user?.firstName ?? '',
              lastName: user?.lastName ?? '',
            }}
            validationSchema={UpdateUserFormValidationSchema}
            onSubmit={(
              values: RegisterValues,
              actions: FormikHelpers<RegisterValues>
            ) => {
              submitHandler(values).finally(() => actions.setSubmitting(false));
            }}
          >
            {({ touched, errors, isValid, isSubmitting }) => (
              <Form>
                <FormField id='_id' name='_id' type='hidden' />
                <FormGroup>
                  <Label htmlFor='email'>Email</Label>
                  <FormField
                    id='email'
                    name='email'
                    type='email'
                    placeholder='awesome@person.com'
                    error={touched.email && errors.email}
                  />
                  <ErrorMessage
                    name='email'
                    render={(error) => <ValidationError>{error}</ValidationError>}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='username'>Username</Label>
                  <FormField
                    id='username'
                    name='username'
                    type='text'
                    placeholder='AwesomePerson'
                    error={touched.username && errors.username}
                  />
                  <ErrorMessage
                    name='username'
                    render={(error) => <ValidationError>{error}</ValidationError>}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='firstName'>First name</Label>
                  <FormField
                    id='firstName'
                    name='firstName'
                    type='text'
                    placeholder='Awesome'
                    error={touched.firstName && errors.firstName}
                  />
                  <ErrorMessage
                    name='FirstName'
                    render={(error) => <ValidationError>{error}</ValidationError>}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='lastName'>Last name</Label>
                  <FormField
                    id='lastName'
                    name='lastName'
                    type='text'
                    placeholder='Person'
                    error={touched.lastName && errors.lastName}
                  />
                  <ErrorMessage
                    name='lastName'
                    render={(error) => <ValidationError>{error}</ValidationError>}
                  />
                </FormGroup>
                <FormGroup>
                  <SubmitButton
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </FormGroup>
              </Form>
            )}
          </Formik>
        </ProfileWrapper>
      </Modal>
  );
};
export default Profile;
