import { ActiveUserMsg, Room } from './room.types';

export const setActiveDMUser = (rooms: Room[], active: ActiveUserMsg): Room[] => {
  rooms = rooms.map(room => {
    if (room._id === active.roomId) {
      room.active = true;
    }
    return room;
  })
  return rooms;
}

export const unsetActiveDMUser = (rooms: Room[], active: ActiveUserMsg): Room[] => {
  rooms = rooms.map(room => {
    if (room._id === active.roomId) {
      room.active = undefined;
    }
    return room;
  })
  return rooms;
}

export const setActiveDMUsers = (rooms: Room[], active: ActiveUserMsg[]): Room[] => {
  const activeIds = active.map(act => act.roomId);
  rooms = rooms.map(room => {
    if (activeIds.includes(room._id ?? '')) {
      room.active = true;
    } else {
      room.active = false;
    }
    return room;
  })
  return rooms;
}
