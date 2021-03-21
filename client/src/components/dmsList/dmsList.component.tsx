// React
import React from 'react';
import { useLocation } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { Room } from '../../redux/room/room.types';
import { setCurrentRoomStart } from '../../redux/room/room.actions';
// Styled
import { DmsListWrapper, DmsListItem, DmsListItemAdd } from './dmsList.styles';
// Components
import SectionHeader from '../sectionHeader/sectionHeader.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

type DmsListProps = {};

const DmsList: React.FC<DmsListProps> = () => {
  const dispatch = useDispatch();
  const dms = useSelector((state: RootState) => state.room.rooms).filter(room => room.type === 'dm');
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const currentUserId = useSelector((state: RootState) => state.user.user?._id);
  const setDm = (room: Room) => dispatch(setCurrentRoomStart(room));
  const location = useLocation();
  return (
    <>
      <SectionHeader>Direct messages</SectionHeader>
      <DmsListWrapper>
        {dms.map((dm: Room) => (
          <DmsListItem key={dm._id} onClick={() => setDm(dm)} active={currentRoom && currentRoom._id === dm._id}>
            {dm.users.filter(user => user._id !== currentUserId).map(user => user.username).join(', ')}
            {dm.hasUnreadMessages && currentRoom && currentRoom._id !== dm._id ? (
              <FontAwesomeIcon icon={faExclamation} style={{ paddingLeft: '10px' }} />
            ) : null}
          </DmsListItem>
        ))}
        <DmsListItemAdd
          to={{
            pathname: '/modal/add-new-dm',
            state: { background: location }
          }}
        >
          Add new direct message
        </DmsListItemAdd>
      </DmsListWrapper>
    </>
  );
};
export default DmsList;
