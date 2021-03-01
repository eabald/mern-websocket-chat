import React, { useEffect } from 'react';
import SectionHeader from '../sectionHeader/sectionHeader.component';
import { UsersListWrapper, UsersListItem } from './usersList.styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { getUsersStart } from '../../redux/user/user.actions';
import { User } from '../../redux/user/user.types';

type UsersListProps = {};

const UsersList: React.FC<UsersListProps> = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  useEffect(() => {
    dispatch(getUsersStart());
  }, [dispatch]);
  return (
    <>
      <SectionHeader>Direct messages</SectionHeader>
      <UsersListWrapper>
        {users.map((user: User) => (
          <UsersListItem active={true} key={user._id}>
            {user.username}
          </UsersListItem>
        ))}
      </UsersListWrapper>
    </>
  );
};
export default UsersList;
