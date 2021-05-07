// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { createRoomStart } from '../../redux/room/room.actions';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// Hooks
import useSearchParams from '../../hooks/useSearchParams';
// I18N
import { useTranslation } from 'react-i18next';
// Validators
import CreateRoomValidationSchema from '../../validators/createRoom.validator';
// Styled
import { AddNewRoomContent } from './addNewRoom.styles';
// Components
import Modal from '../../components/modal/modal.component';
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import MultiSelect from '../../components/form/multiSelect/multiSelect.component';
import ButPopup from '../../components/buyPopup/buyPopup.component';
import TextBlock from '../../components/textBlock/textBlock.component';
// Api
import { findUsersRequest } from '../../api/user.api';
import { buyRoomsCheckStatusStart, buyRoomsCreateSessionStart } from '../../redux/payment/payment.actions';

type AddNewRoomProps = {};
interface FormValues {
  users: any;
  name: string;
}

const AddNewRoom: React.FC<AddNewRoomProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUserId = useSelector((state: RootState) => state.user.user?._id);
  const noOfRooms = useSelector(
    (state: RootState) => state.user.user?.fomo.roomsLimit
  );
  const loading = useSelector((state: RootState) => state.utils.loading);
  const sessionId = useSelector((state: RootState) => state.payment.id)
  const payed = useSearchParams().get('payed');
  const paymentError = useSearchParams().get('error');
  const [hasRooms, setHasRooms] = useState(!!(noOfRooms && noOfRooms > 0));
  const submitHandler = async (values: FormValues): Promise<void> => {
    values.users = values.users.map((user: any) => user.value);
    values.users.push(currentUserId);
    await dispatch(createRoomStart({ ...values, messages: [], type: 'room' }));
  };
  useEffect(() => {
    if (payed && sessionId) {
      dispatch(buyRoomsCheckStatusStart(sessionId));
    } else if (paymentError && sessionId) {
      history.replace({
        search: '',
      })
      dispatch(buyRoomsCheckStatusStart(sessionId));
    }
  }, [dispatch, history, payed, paymentError, sessionId]);
  useEffect(() => {
    setHasRooms(!!(noOfRooms && noOfRooms > 0));
  }, [noOfRooms, loading]);
  const loadOptions = async (input: string) => {
    if (input.length < 3) {
      return [];
    }
    const data = await findUsersRequest(input);
    const returnData = data.users
      .filter((user) => user._id !== currentUserId)
      .map((user) => ({ label: user.username, value: user._id }));
    return returnData;
  };
  return (
    <Modal title={t('Add new room')}>
      <AddNewRoomContent>
        <TextBlock>
          {t('create room info', { noOfRooms: noOfRooms ? noOfRooms : '0' })}
        </TextBlock>
        <Formik
          initialValues={{ users: [], name: '' }}
          validationSchema={CreateRoomValidationSchema}
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
                <Label htmlFor='name'>{t('Room name')}</Label>
                <FormField
                  id='name'
                  name='name'
                  type='name'
                  error={props.touched.name && props.errors.name}
                />
                <ErrorMessage
                  name='name'
                  render={(error) => <ValidationError>{error}</ValidationError>}
                />
              </FormGroup>
              <MultiSelect
                label={t('Users')}
                name='users'
                id='users'
                iid='users'
                loadOptions={loadOptions}
                errorInfo={
                  <ErrorMessage
                    name='users'
                    render={(error) => (
                      <ValidationError>{error}</ValidationError>
                    )}
                  />
                }
              />
              <FormGroup>
                <SubmitButton
                  disabled={!props.isValid || props.isSubmitting}
                  loading={props.isSubmitting}
                  label={t('Add')}
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </AddNewRoomContent>
      {hasRooms ? '' : <ButPopup  price='4.99' action={buyRoomsCreateSessionStart} textKey='buy text rooms' />}
    </Modal>
  );
};
export default AddNewRoom;
