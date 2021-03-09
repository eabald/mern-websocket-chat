// React
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  getRoomsStart,
  setCurrentRoomStart,
} from '../../redux/room/room.actions';
import { Room } from '../../redux/room/room.types';
import { RootState } from '../../redux/root-reducer';
// Styled
import {
  RoomsListWrapper,
  RoomsListItem,
  RoomsListItemAdd,
} from './roomsList.styles';
// Components
import SectionHeader from '../sectionHeader/sectionHeader.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

type RoomsListProps = {};

const RoomsList: React.FC<RoomsListProps> = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const rooms = useSelector((state: RootState) => state.room.rooms);
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const setRoom = (room: Room) => dispatch(setCurrentRoomStart(room));
  const location = useLocation();
  useEffect(() => {
    if (userId) {
      dispatch(getRoomsStart(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <SectionHeader>Rooms</SectionHeader>
      <RoomsListWrapper>
        {rooms.map((room: Room) => (
          <RoomsListItem
            onClick={() => setRoom(room)}
            active={currentRoom && currentRoom._id === room._id}
            key={room._id}
          >
            {room.name}
            {room.hasUnreadMessages ? (
              <FontAwesomeIcon icon={faExclamation} style={{ paddingLeft: '10px' }} />
            ) : null}
          </RoomsListItem>
        ))}
        <RoomsListItemAdd
          to={{
            pathname: '/modal/add-new-room',
            state: { background: location }
          }}
        >
          Add new room
        </RoomsListItemAdd>
      </RoomsListWrapper>
    </>
  );
};

export default RoomsList;
