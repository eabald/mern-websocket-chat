import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomsStart } from '../../redux/room/room.actions';
import { Room } from '../../redux/room/room.types';
import { RootState } from '../../redux/root-reducer';

type RoomsListProps = {};

const RoomsList: React.FC<RoomsListProps> = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const rooms = useSelector((state: RootState) => state.room.rooms);
  useEffect(() => {
    if (userId) {
      dispatch(getRoomsStart(userId));
    }
  }, [dispatch, userId]);

  return (
    <ul>
      {rooms.map((room: Room) => (
        <li key={room._id}>{room.name}</li>
      ))}
    </ul>
  );
};
export default RoomsList;
