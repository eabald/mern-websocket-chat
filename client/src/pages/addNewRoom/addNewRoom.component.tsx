// React
import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { createRoomStart } from '../../redux/room/room.actions';
import { useHistory } from 'react-router';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
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

type AddNewRoomProps = {};
interface FormValues {
  users: any;
  name: string;
}

const AddNewRoom: React.FC<AddNewRoomProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state: RootState) => state.user.users)
  const selectValues = users.map(user => ({label: user.username, value: user._id}))
  const submitHandler = async (values: FormValues): Promise<void> => {
    await dispatch(createRoomStart({...values, messages: []}));
  };
  return (
    <Modal title='Add new room'>
      <AddNewRoomContent>
        <Formik
          initialValues={{ users: [], name: '' }}
          validationSchema={CreateRoomValidationSchema}
          onSubmit={(
            values: FormValues,
            actions: FormikHelpers<FormValues>
          ) => {
            submitHandler(values).then(() => actions.setSubmitting(false)).finally(() => history.goBack());
          }}
        >
          {(props) => (
            <Form>
              <FormGroup>
                <Label htmlFor='name'>Room name</Label>
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
                label='Users'
                name='users'
                id='users'
                iid='users'
                errorInfo={
                  <ErrorMessage
                    name='users'
                    render={(error) => (
                      <ValidationError>{error}</ValidationError>
                    )}
                  />
                }
                values={selectValues}
              />
              <FormGroup>
                <SubmitButton
                  disabled={!props.isValid || props.isSubmitting}
                  loading={props.isSubmitting}
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </AddNewRoomContent>
    </Modal>
  );
};
export default AddNewRoom;
