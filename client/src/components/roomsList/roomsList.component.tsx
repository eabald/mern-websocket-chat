// React
import React, { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getRoomsStart, setCurrentRoomStart } from '../../redux/room/room.actions';
import { Room } from '../../redux/room/room.types';
import { RootState } from '../../redux/root-reducer';
// Styled
import { RoomsListWrapper, RoomsListItem, RoomsListItemAdd } from './roomsList.styles';
// Components
import SectionHeader from '../sectionHeader/sectionHeader.component';

type RoomsListProps = {};

const RoomsList: React.FC<RoomsListProps> = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const rooms = useSelector((state: RootState) => state.room.rooms);
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const setRoom = (room: Room) => dispatch(setCurrentRoomStart(room));
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
          <RoomsListItem onClick={() => setRoom(room)} active={currentRoom && currentRoom._id === room._id } key={room._id}>{room.name}</RoomsListItem>
        ))}
        <RoomsListItemAdd active={false}>Add new room</RoomsListItemAdd>
      </RoomsListWrapper>
    </>
  );
};
export default RoomsList;
