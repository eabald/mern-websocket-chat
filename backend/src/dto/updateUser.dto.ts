import { IsBoolean, IsString } from 'class-validator';

class UpdateUserDto {
  @IsString()
  public _id: string;

  @IsString()
  public username: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public email: string;
}

export default UpdateUserDto;
