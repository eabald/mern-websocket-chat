// React
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { inviteUserStart } from '../../redux/user/user.actions';
import { buyInvitationsCheckStatusStart, buyInvitationCreateSessionStart } from '../../redux/payment/payment.actions';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// I18N
import { useTranslation } from 'react-i18next';
// Hooks
import useSearchParams from '../../hooks/useSearchParams';
// Validators
import InviteNewUserSchema from '../../validators/inviteNewUser.validator';
// Components
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import TextBlock from '../../components/textBlock/textBlock.component';
import ButPopup from '../../components/buyPopup/buyPopup.component';
import Modal from '../../components/modal/modal.component';

type InviteNewUserProps = {};
interface FormValues {
  email: string;
}

const InviteNewUser: React.FC<InviteNewUserProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const payed = useSearchParams().get('payed');
  const paymentError = useSearchParams().get('error');
  const noOfInvitations = useSelector(
    (state: RootState) => state.user.user?.fomo.invitations
  );
  const loading = useSelector((state: RootState) => state.utils.loading);
  const sessionId = useSelector((state: RootState) => state.payment.id)
  const [hasInvitations, setHasInvitations] = useState(!!(noOfInvitations && noOfInvitations > 0));
  const submitHandler = async ({ email }: FormValues): Promise<void> => {
    await dispatch(inviteUserStart(email));
  };
  useEffect(() => {
    if (payed && sessionId) {
      dispatch(buyInvitationsCheckStatusStart(sessionId));
    } else if (paymentError && sessionId) {
      history.replace({
        search: '',
      })
      dispatch(buyInvitationsCheckStatusStart(sessionId));
    }
  }, [dispatch, history, payed, paymentError, sessionId]);
  useEffect(() => {
    setHasInvitations(!!(noOfInvitations && noOfInvitations > 0));
  }, [noOfInvitations, loading]);
  return (
    <Modal title={t('Invite new user')}>
      <TextBlock>
        {t('invitation info', {
          invitations: noOfInvitations ? noOfInvitations.toString() : '0',
        })}
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
            .finally(() => history.push('/'));
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
                disabled={
                  (!props.isValid || props.isSubmitting) && hasInvitations
                }
                loading={props.isSubmitting}
                label={t('Send')}
              />
            </FormGroup>
          </Form>
        )}
      </Formik>
      {hasInvitations ? '' : <ButPopup price='4.99' action={buyInvitationCreateSessionStart} textKey='buy text invitations' />}
    </Modal>
  );
};
export default InviteNewUser;
