import { IsString, IsArray } from 'class-validator';
import User from '../interfaces/user.interface';

class RoomDto {
  @IsString()
  public name: string;

  @IsString()
  public type: string;

  @IsArray()
  public users: User[];
}

export default RoomDto;
