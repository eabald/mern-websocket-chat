// React
import React from 'react';
import { useHistory } from 'react-router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { createRoomStart } from '../../redux/room/room.actions';
import { User } from '../../redux/user/user.types';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// Api
import { findUsersRequest } from '../../api/user.api';
// Validators
import CreateDmValidationSchema from '../../validators/createDm.validator';
// Styled
import { AddNewDmContent } from './addNewDm.styles';
// Components
import Modal from '../../components/modal/modal.component';
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import MultiSelect from '../../components/form/multiSelect/multiSelect.component';

type AddNewDmProps = {};
interface FormValues {
  users: any;
}
const AddNewDm: React.FC<AddNewDmProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state: RootState) => state.user.user);
  const submitHandler = async (values: FormValues): Promise<void> => {
    const users = values.users.map((user: any) => user.value);
    users.push(currentUser?._id);
    let name = values.users.map((user: any) => user.username);
    name.push(currentUser?.username);
    name = name.join('/');
    await dispatch(createRoomStart({ name, type: 'dm', users, messages: [] }));
  };
  const loadOptions = async (input: string) => {
    if (input.length < 3) {
      return [];
    }
    const data = await findUsersRequest(input);
    const returnData = data.users
      .filter((user: User) => user._id !== currentUser?._id)
      .map((user) => ({ label: user.username, value: user._id, username: user.username }));
    return returnData;
  };
  return (
    <Modal title='Add new direct message'>
      <AddNewDmContent>
        <Formik
          initialValues={{ users: [] }}
          validationSchema={CreateDmValidationSchema}
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
              <MultiSelect
                label='Users'
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
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </AddNewDmContent>
    </Modal>
  );
};
export default AddNewDm;
