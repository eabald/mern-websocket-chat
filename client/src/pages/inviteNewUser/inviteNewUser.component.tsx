// React
import React from 'react';
import { useHistory } from 'react-router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// I18N
import { useTranslation } from 'react-i18next';
// Styled
import { InviteNewUserContent } from './inviteNewUser.styles';
// Validators
import InviteNewUserSchema from '../../validators/inviteNewUser.validator';
// Components
import Modal from '../../components/modal/modal.component';
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import TextBlock from '../../components/textBlock/textBlock.component';
import { inviteUserStart } from '../../redux/user/user.actions';

type InviteNewUserProps = {};
interface FormValues {
  email: string;
}

const InviteNewUser: React.FC<InviteNewUserProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const noOfInvitations = useSelector((state: RootState) => state.user.user?.fomo.invitations);
  const submitHandler = async ({ email }: FormValues): Promise<void> => {
    await dispatch(inviteUserStart(email));
  };
  return (
    <Modal title={t('Invite new user')}>
      <InviteNewUserContent>
        <TextBlock>
          {t(
            'invitation info',
            { invitations: noOfInvitations ? noOfInvitations.toString() : '0' }
          )}
        </TextBlock>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={InviteNewUserSchema}
          onSubmit={(
            values: FormValues,
            actions: FormikHelpers<FormValues>
          ) => {
            submitHandler(values)
              .then(() => actions.setSubmitting(false))
              .finally(() => history.goBack());
          }}
        >
          {(props) => (
            <Form>
              <FormGroup>
                <Label htmlFor='email'>{t('New user email')}</Label>
                <FormField
                  id='email'
                  name='email'
                  type='email'
                  error={props.touched.email && props.errors.email}
                />
                <ErrorMessage
                  name='email'
                  render={(error) => <ValidationError>{error}</ValidationError>}
                />
              </FormGroup>
              <FormGroup>
                <SubmitButton
                  disabled={!props.isValid || props.isSubmitting}
                  loading={props.isSubmitting}
                  label={t('Send')}
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </InviteNewUserContent>
    </Modal>
  );
};
export default InviteNewUser;
