// React
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// Styled
import {
  UserDetailsWrapper,
  UserDetailsItemWrapper,
  UserDetailsLabel,
  UserDetailsText,
} from './userDetails.styles';
// Components
import Modal from '../../components/modal/modal.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { getUserDetailsStart } from '../../redux/user/user.actions';
import Spinner from '../../components/spinner/spinner.component';
import { User } from '../../redux/user/user.types';

type UserDetailsProps = {};

const UserDetails: React.FC<UserDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const usersAvailable = useSelector((state: RootState) => state.user.users);
  const [currentUserDetails, setCurrentUserDetails] = useState<User | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const currentUserDetailsInAvailable = usersAvailable.find(
      (user) => user._id === id
    );
    if (currentUserDetailsInAvailable) {
      setCurrentUserDetails(currentUserDetailsInAvailable);
      setLoading(false);
    } else {
      dispatch(getUserDetailsStart(id));
    }
    console.log(currentUserDetailsInAvailable);
  }, [usersAvailable, dispatch, id]);
  return (
    <Modal title='Details'>
      <UserDetailsWrapper>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <UserDetailsItemWrapper>
              <UserDetailsLabel>Email:</UserDetailsLabel>
              <UserDetailsText>
                {currentUserDetails?.email}
              </UserDetailsText>
            </UserDetailsItemWrapper>
            <UserDetailsItemWrapper>
              <UserDetailsLabel>Username:</UserDetailsLabel>
              <UserDetailsText>
                {currentUserDetails?.username}
              </UserDetailsText>
            </UserDetailsItemWrapper>
            <UserDetailsItemWrapper>
              <UserDetailsLabel>First name:</UserDetailsLabel>
              <UserDetailsText>
                {currentUserDetails?.firstName}
              </UserDetailsText>
            </UserDetailsItemWrapper>
            <UserDetailsItemWrapper>
              <UserDetailsLabel>Last name:</UserDetailsLabel>
              <UserDetailsText>
                {currentUserDetails?.lastName}
              </UserDetailsText>
            </UserDetailsItemWrapper>
          </>
        )}
      </UserDetailsWrapper>
    </Modal>
  );
};
export default UserDetails;
